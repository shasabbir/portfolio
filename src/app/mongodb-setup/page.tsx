'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Database, CheckCircle, XCircle } from 'lucide-react';

export default function MongoDBSetup() {
  const [migrationStatus, setMigrationStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });

  const [testConnection, setTestConnection] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });

  const runMigration = async () => {
    setMigrationStatus({ loading: true });
    
    try {
      const response = await fetch('/api/migrate', {
        method: 'POST',
      });
      
      const result = await response.json();
      setMigrationStatus({
        loading: false,
        success: result.success,
        message: result.message,
      });
    } catch (error) {
      setMigrationStatus({
        loading: false,
        success: false,
        message: 'Failed to run migration',
      });
    }
  };

  const testDBConnection = async () => {
    setTestConnection({ loading: true });
    
    try {
      // Test by trying to fetch publications
      const response = await fetch('/api/test-db', {
        method: 'GET',
      });
      
      if (response.ok) {
        setTestConnection({
          loading: false,
          success: true,
          message: 'Database connection successful!',
        });
      } else {
        setTestConnection({
          loading: false,
          success: false,
          message: 'Database connection failed',
        });
      }
    } catch (error) {
      setTestConnection({
        loading: false,
        success: false,
        message: 'Failed to test connection',
      });
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">MongoDB Setup & Migration</h1>
        <p className="text-muted-foreground mt-2">
          Set up MongoDB Atlas and migrate your existing data
        </p>
      </div>

      <div className="space-y-6">
        {/* Setup Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              MongoDB Atlas Setup Instructions
            </CardTitle>
            <CardDescription>
              Follow these steps to set up your free MongoDB Atlas database
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Create MongoDB Atlas Account</h4>
              <p className="text-sm text-muted-foreground">
                • Go to <a href="https://www.mongodb.com/atlas" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mongodb.com/atlas</a>
                <br />
                • Click "Try Free" and sign up
                <br />
                • Choose "Build a database" → Select FREE tier (M0)
                <br />
                • Choose AWS and a region close to you
                <br />
                • Name your cluster (e.g., "portfolio-cluster")
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2. Configure Database Access</h4>
              <p className="text-sm text-muted-foreground">
                • Create a database user with username and password (save these!)
                <br />
                • Add IP address: 0.0.0.0/0 (allows all IPs for development)
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3. Get Connection String</h4>
              <p className="text-sm text-muted-foreground">
                • Click "Connect" → "Connect your application"
                <br />
                • Copy the connection string
                <br />
                • Replace &lt;password&gt; with your actual password
                <br />
                • Update your .env.local file with the connection string
              </p>
            </div>

            <Alert>
              <AlertDescription>
                <strong>Your .env.local file should look like:</strong>
                <br />
                <code className="text-sm bg-muted px-1 rounded">
                  MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
                </code>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Test Connection */}
        <Card>
          <CardHeader>
            <CardTitle>Test Database Connection</CardTitle>
            <CardDescription>
              Verify that your MongoDB connection is working
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testDBConnection} 
              disabled={testConnection.loading}
              className="w-full"
            >
              {testConnection.loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing Connection...
                </>
              ) : (
                'Test Database Connection'
              )}
            </Button>

            {testConnection.message && (
              <Alert>
                {testConnection.success ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <AlertDescription className={testConnection.success ? 'text-green-700' : 'text-red-700'}>
                  {testConnection.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Migration */}
        <Card>
          <CardHeader>
            <CardTitle>Migrate Existing Data</CardTitle>
            <CardDescription>
              Move your blog posts and publications from JSON files to MongoDB
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                <strong>Warning:</strong> This will clear existing MongoDB data and replace it with your JSON data. Only run this once!
              </AlertDescription>
            </Alert>

            <Button 
              onClick={runMigration} 
              disabled={migrationStatus.loading}
              variant="destructive"
              className="w-full"
            >
              {migrationStatus.loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Migrating Data...
                </>
              ) : (
                'Run Data Migration'
              )}
            </Button>

            {migrationStatus.message && (
              <Alert>
                {migrationStatus.success ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <AlertDescription className={migrationStatus.success ? 'text-green-700' : 'text-red-700'}>
                  {migrationStatus.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>
              After successful migration, update your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              1. Replace imports in your action files to use MongoDB versions
              <br />
              2. Update your application to use the new database-powered actions
              <br />
              3. Test your blog and publications pages
              <br />
              4. Remove or backup your JSON files once everything works
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}