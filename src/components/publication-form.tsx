'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useActionState, useEffect, useState, useTransition, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import {
  handleFormatCitation,
  savePublication,
} from '@/app/publications/actions-mongodb';
import { Loader2, Sparkles } from 'lucide-react';

interface PublicationFormProps {
  triggerButton: React.ReactNode;
}



function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        'Save Publication'
      )}
    </Button>
  );
}

export function PublicationForm({ triggerButton }: PublicationFormProps) {
  const [open, setOpen] = useState(false);
  const [saveState, saveFormAction] = useActionState(savePublication, {
    message: '',
    success: false,
  });
  const [isFormatting, startFormatTransition] = useTransition();
  const isSubmittingRef = useRef(false);
  const [citationStyle, setCitationStyle] = useState<'APA' | 'MLA' | 'Chicago'>('APA');
  const [formattedCitation, setFormattedCitation] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    venue: '',
    year: '',
    doi: '',
    publicationType: 'Journal' as 'Journal' | 'Conference' | 'Preprint',
    abstract: '',
  });

  useEffect(() => {
    if (saveState.success) {
      setOpen(false);
      isSubmittingRef.current = false;
      // Reset form
      setFormData({
        title: '',
        authors: '',
        venue: '',
        year: '',
        doi: '',
        publicationType: 'Journal',
        abstract: '',
      });
      setFormattedCitation('');
    } else if (saveState.message && !saveState.success) {
      // Reset submitting state on error
      isSubmittingRef.current = false;
    }
  }, [saveState.success, saveState.message]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFormat = () => {
    startFormatTransition(async () => {
      const result = await handleFormatCitation({ ...formData, citationStyle });
      if (result.formatted) {
        setFormattedCitation(result.formatted);
      } else {
        // Handle error, maybe show a toast
        console.error(result.error);
      }
    });
  };

  const handleSubmit = async (formData: FormData) => {
    if (isSubmittingRef.current) return; // Prevent multiple submissions
    isSubmittingRef.current = true;
    try {
      await saveFormAction(formData);
    } finally {
      // Reset will be handled in useEffect
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerButton}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline">Add Publication</DialogTitle>
          <DialogDescription>
            Add publication details to your portfolio.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="authors">Authors</Label>
              <Input id="authors" name="authors" value={formData.authors} onChange={handleInputChange} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="venue">Venue</Label>
              <Input id="venue" name="venue" value={formData.venue} onChange={handleInputChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="year">Year</Label>
              <Input id="year" name="year" value={formData.year} onChange={handleInputChange} />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="doi">DOI</Label>
            <Input id="doi" name="doi" value={formData.doi} onChange={handleInputChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="publicationType">Publication Type</Label>
            <Select value={formData.publicationType} onValueChange={(value: string) => handleSelectChange('publicationType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Journal">Journal</SelectItem>
                <SelectItem value="Conference">Conference</SelectItem>
                <SelectItem value="Preprint">Preprint</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="abstract">Abstract</Label>
            <Textarea
              id="abstract"
              name="abstract"
              value={formData.abstract}
              onChange={handleInputChange}
              placeholder="Brief description of the publication..."
              rows={3}
            />
          </div>
        </div>

        <div className="mt-6 rounded-lg border bg-muted/50 p-4">
           <div className="flex items-center justify-between">
            <div>
                <Label>Formatted Citation</Label>
                <p className="text-sm text-muted-foreground">Select a style and click format to generate.</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={citationStyle} onValueChange={setCitationStyle}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="APA">APA</SelectItem>
                  <SelectItem value="MLA">MLA</SelectItem>
                  <SelectItem value="Chicago">Chicago</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleFormat} disabled={isFormatting}>
                {isFormatting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Format
              </Button>
            </div>
          </div>
          {formattedCitation && (
             <blockquote className="mt-4 border-l-2 pl-4 text-sm italic">
                {formattedCitation}
            </blockquote>
          )}
        </div>

        <form action={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
          {saveState.message && !saveState.success && (
            <p className="mb-4 text-sm text-destructive">{saveState.message}</p>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
