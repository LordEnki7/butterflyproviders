import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import AdminLogin from "./AdminLogin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  ClipboardList, 
  Plus, 
  Edit, 
  Trash2, 
  BarChart3,
  UserPlus,
  CalendarPlus,
  FileText,
  Settings,
  Mail,
  Receipt
} from "lucide-react";

// Form schemas
const clientFormSchema = z.object({
  userId: z.string().optional(),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  emergencyPhone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(1, "Address is required"),
  medicalNotes: z.string().optional(),
  careNotes: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]).default("active"),
});

const caregiverFormSchema = z.object({
  userId: z.string().optional(),
  certification: z.string().min(1, "Certification is required"),
  experience: z.number().min(0, "Experience must be 0 or greater"),
  specialties: z.string().optional(),
  hourlyRate: z.string().min(1, "Hourly rate is required"),
  availability: z.string().optional(),
  isActive: z.boolean().default(true),
});

const appointmentFormSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  caregiverId: z.string().min(1, "Caregiver is required"),
  scheduledDate: z.string().min(1, "Date is required"),
  duration: z.number().min(15, "Duration must be at least 15 minutes"),
  serviceType: z.string().min(1, "Service type is required"),
  status: z.enum(["scheduled", "completed", "cancelled", "in-progress"]).default("scheduled"),
  notes: z.string().optional(),
});

const serviceFormSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
  basePrice: z.string().min(1, "Base price is required"),
  duration: z.number().min(15, "Duration must be at least 15 minutes"),
  category: z.string().min(1, "Category is required"),
  isActive: z.boolean().default(true),
});

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Check if admin is already authenticated on mount
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await fetch("/api/admin/check-auth");
        if (response.ok) {
          setIsAdminAuthenticated(true);
        }
      } catch (error) {
        // Admin not authenticated, will show login form
      }
    };
    checkAdminAuth();
  }, []);

  // Dashboard stats query
  const { data: dashboardStats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/dashboard"],
    retry: false,
  });

  // Data queries
  const { data: users = [] } = useQuery({
    queryKey: ["/api/admin/users"],
    retry: false,
  });

  const { data: clients = [] } = useQuery({
    queryKey: ["/api/admin/clients"],
    retry: false,
  });

  const { data: caregivers = [] } = useQuery({
    queryKey: ["/api/admin/caregivers"],
    retry: false,
  });

  const { data: appointments = [] } = useQuery({
    queryKey: ["/api/admin/appointments"],
    retry: false,
  });

  const { data: services = [] } = useQuery({
    queryKey: ["/api/admin/services"],
    retry: false,
  });

  const { data: billings = [] } = useQuery({
    queryKey: ["/api/admin/billings"],
    retry: false,
  });

  const { data: contactInquiries = [] } = useQuery({
    queryKey: ["/api/admin/contact-inquiries"],
    retry: false,
  });

  const { data: consultationRequests = [] } = useQuery({
    queryKey: ["/api/admin/consultation-requests"],
    retry: false,
  });

  // Generic mutation for CRUD operations
  const createMutation = useMutation({
    mutationFn: async ({ endpoint, data }: { endpoint: string; data: any }) => {
      return await apiRequest(endpoint, "POST", data);
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Success",
        description: "Item created successfully",
      });
      queryClient.invalidateQueries({ queryKey: [variables.endpoint.replace("/admin", "/admin")] });
      setDialogOpen(false);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You need admin access. Redirecting to login...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create item",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ endpoint, data }: { endpoint: string; data: any }) => {
      return await apiRequest(endpoint, "PUT", data);
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Success",
        description: "Item updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: [variables.endpoint.split("/").slice(0, -1).join("/")] });
      setDialogOpen(false);
      setEditingItem(null);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You need admin access. Redirecting to login...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (endpoint: string) => {
      return await apiRequest(endpoint, "DELETE");
    },
    onSuccess: (_, endpoint) => {
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
      const baseEndpoint = endpoint.split("/").slice(0, -1).join("/");
      queryClient.invalidateQueries({ queryKey: [baseEndpoint] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You need admin access. Redirecting to login...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    },
  });

  // Dashboard Component
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(dashboardStats as any)?.totalClients || 0}</div>
            <p className="text-xs text-muted-foreground">Active clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(dashboardStats as any)?.activeAppointments || 0}</div>
            <p className="text-xs text-muted-foreground">Scheduled appointments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(dashboardStats as any)?.totalRevenue || 0}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(dashboardStats as any)?.pendingBills || 0}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Care Updates</CardTitle>
            <CardDescription>Latest updates from caregivers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(dashboardStats as any)?.recentCareUpdates?.map((update: any) => (
                <div key={update.id} className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{update.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {new Date(update.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline">{update.updateType}</Badge>
                </div>
              )) || <p className="text-sm text-muted-foreground">No recent updates</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Next scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(dashboardStats as any)?.upcomingAppointments?.map((appointment: any) => (
                <div key={appointment.id} className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{appointment.serviceType}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {new Date(appointment.scheduledDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline">{appointment.status}</Badge>
                </div>
              )) || <p className="text-sm text-muted-foreground">No upcoming appointments</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Client Form Component
  const ClientForm = ({ client, onSubmit }: { client?: any; onSubmit: (data: any) => void }) => {
    const form = useForm({
      resolver: zodResolver(clientFormSchema),
      defaultValues: {
        userId: client?.userId || "",
        emergencyContact: client?.emergencyContact || "",
        emergencyPhone: client?.emergencyPhone || "",
        address: client?.address || "",
        medicalNotes: client?.medicalNotes || "",
        careNotes: client?.careNotes || "",
        status: client?.status || "active",
      },
    });

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="emergencyContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact</FormLabel>
                <FormControl>
                  <Input placeholder="Emergency contact name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Emergency contact phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Full address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="medicalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medical Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Medical conditions, allergies, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="careNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Care Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Special care instructions" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {client ? "Update Client" : "Create Client"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    );
  };

  // Show admin login if not authenticated
  if (!isAdminAuthenticated) {
    return (
      <AdminLogin 
        onSuccess={() => setIsAdminAuthenticated(true)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage clients, caregivers, appointments, and more</p>
          </div>
          <Button
            variant="outline"
            onClick={async () => {
              try {
                await fetch("/api/admin/logout", { method: "POST" });
                setIsAdminAuthenticated(false);
                toast({
                  title: "Logged out",
                  description: "Admin session ended successfully",
                });
              } catch (error) {
                toast({
                  title: "Error",
                  description: "Failed to log out",
                  variant: "destructive",
                });
              }
            }}
          >
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-10">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="caregivers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Caregivers
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <CalendarPlus className="w-4 h-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="consultations" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Consultations
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Inquiries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and roles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(users as any[]).map((user: any) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                            {user.role || "user"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(users as any[])?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          <p className="text-gray-500">No users found</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Client Management</CardTitle>
                  <CardDescription>Manage client information and care details</CardDescription>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Client
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingItem ? "Edit Client" : "Add New Client"}</DialogTitle>
                      <DialogDescription>
                        {editingItem ? "Update client information" : "Create a new client profile"}
                      </DialogDescription>
                    </DialogHeader>
                    <ClientForm
                      client={editingItem}
                      onSubmit={(data) => {
                        if (editingItem) {
                          updateMutation.mutate({
                            endpoint: `/api/admin/clients/${editingItem.id}`,
                            data,
                          });
                        } else {
                          createMutation.mutate({
                            endpoint: "/api/admin/clients",
                            data,
                          });
                        }
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Emergency Contact</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(clients as any[]).map((client: any) => (
                      <TableRow key={client.id}>
                        <TableCell>{client.emergencyContact}</TableCell>
                        <TableCell>{client.emergencyPhone}</TableCell>
                        <TableCell className="max-w-xs truncate">{client.address}</TableCell>
                        <TableCell>
                          <Badge variant={client.status === "active" ? "default" : "secondary"}>
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(client.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingItem(client);
                              setDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this client?")) {
                                deleteMutation.mutate(`/api/admin/clients/${client.id}`);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(clients as any[])?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          <p className="text-gray-500">No clients found</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Invoice Management</CardTitle>
                    <CardDescription>Create and manage client invoices</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Invoice
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New Invoice</DialogTitle>
                        <DialogDescription>
                          Generate a new invoice for a client
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Client</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select client" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="demo">Select a client</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Due Date</label>
                          <Input type="date" className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Notes</label>
                          <Textarea placeholder="Invoice notes..." className="mt-1" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                          Create Invoice
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">BP-202501-0001</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>$150.00</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell>Jan 15, 2025</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            Mark Paid
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">BP-202501-0002</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>$200.00</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Paid
                        </Badge>
                      </TableCell>
                      <TableCell>Jan 10, 2025</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations">
            <Card>
              <CardHeader>
                <CardTitle>Consultation Requests</CardTitle>
                <CardDescription>Incoming requests for consultations and callbacks</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Preferred Date</TableHead>
                      <TableHead>Preferred Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(consultationRequests as any[])?.map((request: any) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.phone}</TableCell>
                        <TableCell>{request.email || 'Not provided'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {request.serviceType || 'Not specified'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            request.urgency === 'immediately' ? 'destructive' :
                            request.urgency === 'within-week' ? 'default' : 'secondary'
                          }>
                            {request.urgency?.replace('-', ' ') || 'within week'}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.preferredDate || 'Any date'}</TableCell>
                        <TableCell>{request.preferredTime || 'Anytime'}</TableCell>
                        <TableCell>
                          <Badge variant={
                            request.status === 'pending' ? 'outline' :
                            request.status === 'contacted' ? 'default' :
                            request.status === 'scheduled' ? 'default' : 'secondary'
                          }>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(request.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Mark Contacted
                            </Button>
                            <Button variant="outline" size="sm">
                              Schedule
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(consultationRequests as any[])?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                          No consultation requests yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>Contact Inquiries</CardTitle>
                <CardDescription>Messages from potential clients</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(contactInquiries as any[]).map((inquiry: any) => (
                      <TableRow key={inquiry.id}>
                        <TableCell>
                          {inquiry.firstName} {inquiry.lastName}
                        </TableCell>
                        <TableCell>{inquiry.email}</TableCell>
                        <TableCell>{inquiry.phone}</TableCell>
                        <TableCell className="max-w-xs truncate">{inquiry.message}</TableCell>
                        <TableCell>
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional tabs would continue here with similar patterns for caregivers, appointments, services, billing */}
        </Tabs>
      </div>
    </div>
  );
}