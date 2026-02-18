import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ArrowLeft, Key, Server, User, CheckCircle2, Webhook, Copy, Eye, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const MOCK_WEBHOOK_PAYLOAD = {
  event: "envelope-completed",
  apiAccountId: "a]b3c4d5-e6f7-8901-2345-6789abcdef01",
  uri: "/restapi/v2.1/accounts/12345/envelopes/abc-def-123",
  retryCount: 0,
  configurationId: 10234,
  generatedDateTime: "2026-02-18T14:32:00.0000000Z",
  data: {
    accountId: "12345",
    envelopeId: "abc-def-123-456-789",
    userId: "user-001",
    status: "completed",
    statusChangedDateTime: "2026-02-18T14:31:55.0000000Z",
    envelopeSummary: {
      recipients: {
        signers: [
          {
            name: "John Doe",
            email: "john.doe@example.com",
            status: "completed",
            signedDateTime: "2026-02-18T14:31:50.0000000Z"
          }
        ]
      },
      documents: [
        {
          documentId: "1",
          name: "Service Agreement.pdf",
          type: "content"
        }
      ]
    }
  }
};

export default function ApiEnvironment() {
  const { toast } = useToast();
  const [integrationKey, setIntegrationKey] = useState('');
  const [accountId, setAccountId] = useState('');
  const [userId, setUserId] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [showDataModal, setShowDataModal] = useState(false);

  const handleConfigure = () => {
    if (!integrationKey || !accountId || !userId) return;
    setIsConfigured(true);
    toast({
      title: "Environment configured successfully!",
      description: "Your API environment is ready for use.",
    });
  };

  const handleGenerateWebhook = () => {
    const id = Math.random().toString(36).substring(2, 10);
    setWebhookUrl(`https://mockapi.yourplatform.com/webhook/${id}`);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast({ title: "Copied!", description: "Webhook URL copied to clipboard." });
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="animate-fade-in">
          <Link to="/trails/trail-api" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to API Track
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My API Environment</h1>
          </div>
          <p className="text-muted-foreground">Configure your developer credentials and webhook endpoints.</p>
        </div>

        {/* Configuration Card */}
        <Card className="animate-fade-in border-border" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              Environment Configuration
            </CardTitle>
            <CardDescription>Enter your API credentials to set up the environment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="integrationKey" className="flex items-center gap-2">
                <Key className="w-4 h-4 text-muted-foreground" />
                Integration Key
              </Label>
              <Input
                id="integrationKey"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                value={integrationKey}
                onChange={(e) => setIntegrationKey(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountId" className="flex items-center gap-2">
                <Server className="w-4 h-4 text-muted-foreground" />
                Account ID
              </Label>
              <Input
                id="accountId"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userId" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                User ID
              </Label>
              <Input
                id="userId"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <Button
              onClick={handleConfigure}
              disabled={!integrationKey || !accountId || !userId}
              className="w-full mt-2"
            >
              {isConfigured ? (
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Environment Configured</span>
              ) : (
                "Configure Environment"
              )}
            </Button>

            {isConfigured && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-700 dark:text-emerald-400 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Environment configured successfully!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Webhook Section */}
        <Card className="animate-fade-in border-border" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Webhook className="w-5 h-5 text-primary" />
              Webhook Listener
            </CardTitle>
            <CardDescription>Generate a webhook endpoint to receive real-time events.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleGenerateWebhook} variant="outline" className="gap-2">
              <Webhook className="w-4 h-4" />
              Generate Webhook Listener URL
            </Button>

            {webhookUrl && (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border font-mono text-sm break-all">
                    {webhookUrl}
                  </code>
                  <Button size="icon" variant="outline" onClick={handleCopyUrl} title="Copy URL">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <Button onClick={() => setShowDataModal(true)} variant="secondary" className="gap-2">
                  <Eye className="w-4 h-4" />
                  View Data
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data Modal */}
        <Dialog open={showDataModal} onOpenChange={setShowDataModal}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Webhook Payload Data
              </DialogTitle>
              <DialogDescription>
                Sample webhook event received from the eSignature API.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-auto">
              <pre className="p-4 rounded-lg bg-muted border border-border font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
{JSON.stringify(MOCK_WEBHOOK_PAYLOAD, null, 2)}
              </pre>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
