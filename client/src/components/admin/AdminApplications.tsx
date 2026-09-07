import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const statuses = ["pending", "reviewed", "interview", "hired", "rejected"] as const;
type ApplicationStatus = typeof statuses[number];

type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: ApplicationStatus;
  createdAt: string;
  hasResume: boolean;
  workExperience: Record<string, unknown>;
  additionalNotes: {
    address?: string;
    gender?: string;
    otherLanguages?: string;
    skills?: string;
    availability?: Record<string, boolean>;
    preferences?: Record<string, unknown>;
    resume?: { originalName?: string; size?: number } | null;
  };
};

const titleCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const showValue = (value: unknown) => value === undefined || value === null || value === "" ? "Not provided" : String(value);

export default function AdminApplications() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: applications = [], isLoading } = useQuery<Application[]>({
    queryKey: ["/api/admin/job-applications"],
  });
  const { data: selected } = useQuery<Application>({
    queryKey: ["/api/admin/job-applications", selectedId],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/admin/job-applications/${selectedId}`);
      return response.json();
    },
    enabled: Boolean(selectedId),
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ApplicationStatus }) => {
      const response = await apiRequest("PATCH", `/api/admin/job-applications/${id}/status`, { status });
      return response.json();
    },
    onSuccess: (application: Application) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/job-applications"] });
      queryClient.setQueryData(["/api/admin/job-applications", application.id], application);
      toast({ title: "Status updated", description: `${application.name} is now ${application.status}.` });
    },
    onError: () => toast({ title: "Update failed", description: "The application status could not be updated.", variant: "destructive" }),
  });

  const downloadResume = async (application: Application) => {
    try {
      const response = await apiRequest("GET", `/api/admin/job-applications/${application.id}/resume`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = application.additionalNotes.resume?.originalName || `${application.name}-resume`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch {
      toast({ title: "Download failed", description: "The resume could not be downloaded.", variant: "destructive" });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Caregiver Applications</CardTitle>
          <CardDescription>Review applicant details and manage hiring status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.name}</TableCell>
                  <TableCell><div>{application.email}</div><div className="text-sm text-muted-foreground">{application.phone}</div></TableCell>
                  <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell><Badge variant="outline">{titleCase(application.status)}</Badge></TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedId(application.id)}><Eye className="mr-1 h-4 w-4" />Review</Button>
                    {application.hasResume && <Button variant="outline" size="sm" onClick={() => downloadResume(application)}><Download className="mr-1 h-4 w-4" />Resume</Button>}
                  </TableCell>
                </TableRow>
              ))}
              {!isLoading && applications.length === 0 && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No caregiver applications yet.</TableCell></TableRow>}
              {isLoading && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">Loading applications…</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={Boolean(selectedId)} onOpenChange={(open) => !open && setSelectedId(null)}>
        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selected?.name || "Application details"}</DialogTitle>
            <DialogDescription>Submitted {selected ? new Date(selected.createdAt).toLocaleString() : ""}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Detail label="Email" value={selected.email} />
                <Detail label="Phone" value={selected.phone} />
                <Detail label="Address" value={selected.additionalNotes.address} />
                <Detail label="Gender" value={selected.additionalNotes.gender} />
                <Detail label="Languages" value={selected.additionalNotes.otherLanguages} />
                <Detail label="Skills" value={selected.additionalNotes.skills} />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Work experience</h3>
                <div className="grid gap-4 rounded-md border p-4 sm:grid-cols-2">
                  {Object.entries(selected.workExperience || {}).map(([key, value]) => <Detail key={key} label={titleCase(key.replace(/([A-Z])/g, " $1"))} value={value} />)}
                </div>
              </div>
              <div className="flex flex-wrap items-end gap-3 border-t pt-4">
                <div className="min-w-48">
                  <label className="mb-2 block text-sm font-medium">Hiring status</label>
                  <Select value={selected.status} onValueChange={(status: ApplicationStatus) => statusMutation.mutate({ id: selected.id, status })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{statuses.map((status) => <SelectItem key={status} value={status}>{titleCase(status)}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                {selected.hasResume && <Button variant="outline" onClick={() => downloadResume(selected)}><Download className="mr-2 h-4 w-4" />Download {selected.additionalNotes.resume?.originalName || "resume"}</Button>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Detail({ label, value }: { label: string; value: unknown }) {
  return <div><div className="text-sm font-medium text-muted-foreground">{label}</div><div className="whitespace-pre-wrap">{showValue(value)}</div></div>;
}