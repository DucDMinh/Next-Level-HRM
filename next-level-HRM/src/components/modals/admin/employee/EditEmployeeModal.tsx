import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { Label } from 'src/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'src/components/ui/select';
import { toast } from 'sonner';
import { api } from 'src/lib/apiClient';
import { Employee } from 'src/interface';
import { useAuth } from 'src/providers/AuthContext';

export interface EmployeeFormData {
    fullName: string;
    username: string;
    email: string;
    position: string;
    department?: string;
    role: string;
    joinDate?: string;
    password: string;
    baseSalary: number;
}

interface EditEmployeeModalProps {
    emp: Employee | null;
    isOpen: boolean;
    onClose: () => void;
    fetchEmployeeData: () => void
}

export function EditEmployeeModal({ emp, isOpen, onClose, fetchEmployeeData }: EditEmployeeModalProps) {
    const [formData, setFormData] = useState<EmployeeFormData>({
        fullName: '',
        email: '',
        position: '',
        department: '',
        role: '',
        username: '',
        password: '',
        baseSalary: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();

    const handleSaveChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true)
        try {
            const { response, data } = await api.put(`/api/employees/${emp?.id}`, formData);
            if (!response.ok) { throw new Error(data.message) }
            toast.success("Emp's Information has been change~")
            if (emp?.id === user?.id) {
                localStorage.setItem("userData", JSON.stringify(formData));
            }
            onClose()
            fetchEmployeeData()
        } catch (error: any) {
            toast.error(error)
            onClose()
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        setFormData({
            fullName: emp?.fullName || '',
            email: emp?.email || '',
            position: emp?.position || '',
            department: emp?.department || '',
            role: emp?.role || '',
            username: emp?.username || '',
            password: '',
            baseSalary: emp?.baseSalary || 0,
        });
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: keyof EmployeeFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Edit Information</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSaveChange} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            placeholder="e.g. Nguyen Van A"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="e.g. admin@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="e.g. admin"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="baseSalary">Base Salary</Label>
                        <Input
                            id="baseSalary"
                            name="baseSalary"
                            type="number"
                            placeholder="e.g. 5000"
                            value={formData.baseSalary}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="space-y-2">
                            <Label htmlFor="position">Position</Label>
                            <Input
                                id="position"
                                name="position"
                                placeholder="e.g. Developer"
                                value={formData.position}
                                onChange={handleChange}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(val) => handleSelectChange('role', val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">admin</SelectItem>
                                    <SelectItem value="employee">employee</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Department</Label>
                            <Select
                                value={formData.department}
                                onValueChange={(val) => handleSelectChange('department', val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="IT">IT</SelectItem>
                                    <SelectItem value="HR">HR</SelectItem>
                                    <SelectItem value="QA">QA</SelectItem>
                                    <SelectItem value="Engineering">Engineering</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                    <DialogFooter className="pt-4 mt-4 border-t">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}