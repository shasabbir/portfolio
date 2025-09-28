'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function ImageUploadTest() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const testUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setResult({ error: 'No file selected' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({ success: true, data });
      } else {
        setResult({ success: false, error: data.error, details: data.details });
      }
    } catch (error) {
      setResult({ 
        success: false, 
        error: 'Network error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const testListImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/upload-image');
      const data = await response.json();
      setResult({ success: true, data, type: 'list' });
    } catch (error) {
      setResult({ 
        success: false, 
        error: 'Failed to list images',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-6">Image Upload API Test</h1>
      
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="file" className="block text-sm font-medium mb-2">
            Select Image File:
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            id="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        
        <div className="flex gap-4">
          <Button onClick={testUpload} disabled={loading}>
            {loading ? 'Testing...' : 'Test Upload'}
          </Button>
          <Button onClick={testListImages} disabled={loading} variant="outline">
            {loading ? 'Loading...' : 'List Images'}
          </Button>
        </div>
      </div>

      {result && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
          
          {result.success && result.data?.imageUrl && (
            <div className="mt-4">
              <h3 className="text-md font-medium mb-2">Uploaded Image:</h3>
              <img 
                src={result.data.imageUrl} 
                alt="Uploaded" 
                className="max-w-xs rounded-lg border"
              />
            </div>
          )}

          {result.success && result.data?.images && (
            <div className="mt-4">
              <h3 className="text-md font-medium mb-2">Existing Images:</h3>
              <div className="grid grid-cols-2 gap-2">
                {result.data.images.map((imageUrl: string) => (
                  <img 
                    key={imageUrl}
                    src={imageUrl} 
                    alt="Existing" 
                    className="w-full h-20 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}