import { Button } from 'src/components/ui/button';
import { Label } from 'src/components/ui/label';
import { Send, FileText, Calendar } from 'lucide-react';
import CardBox from 'src/components/shared/CardBox';
import { useState } from 'react';
import { api } from 'src/lib/apiClient';
import { toast } from 'sonner';
import { LeaveRequest } from 'src/interface';

export const CreateLeaveRequestForm = ({ leaveRequestData, setLeaveRequestData }: { leaveRequestData: LeaveRequest[], setLeaveRequestData: React.Dispatch<React.SetStateAction<LeaveRequest[]>> }) => {
    const [isSending, setIsSending] = useState(false)
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        reason: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSendRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSending(true)
            const { response, data } = await api.post('/api/leave-requests', formData)
            if (!response.ok) throw new Error(data.message);
            toast.success("Ok")
            if (data) {
                setLeaveRequestData([...leaveRequestData, data])
                setFormData({
                    fromDate: '',
                    toDate: '',
                    reason: ''
                })
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsSending(false)
        }
    }
    const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    return (
        <div className="lg:col-span-1">
            <CardBox className="h-full">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                            <FileText className="size-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Create Leave Request
                        </h2>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleSendRequest}>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="startDate" className="text-gray-600 dark:text-gray-300">
                                From Date <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none z-10" />
                                <input
                                    type="date"
                                    min={today}
                                    max={formData.toDate}
                                    name="fromDate"
                                    value={formData.fromDate}
                                    onChange={handleChange}
                                    onClick={(e) => {
                                        if ('showPicker' in HTMLInputElement.prototype) {
                                            e.currentTarget.showPicker();
                                        }
                                    }}
                                    className="w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm font-medium focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white [color-scheme:light_dark]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="startDate" className="text-gray-600 dark:text-gray-300">
                                To Date <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none z-10" />
                                <input
                                    type="date"
                                    name="toDate"
                                    min={formData.fromDate}
                                    value={formData.toDate}
                                    onClick={(e) => {
                                        if ('showPicker' in HTMLInputElement.prototype) {
                                            e.currentTarget.showPicker();
                                        }
                                    }}
                                    onChange={handleChange}
                                    className="w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm font-medium focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white [color-scheme:light_dark]"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="reason" className="text-gray-600 dark:text-gray-300">
                                Reason for Leave <span className="text-red-500">*</span>
                            </Label>
                            <textarea
                                id="reason"
                                name="reason"
                                rows={4}
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Please provide detailed reasons for your leave..."
                                className="w-full p-3 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-gray-800 dark:text-white placeholder:text-gray-400"
                            ></textarea>
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 mt-2 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            {isSending ? <>Loading...</> : <><Send className="size-4" />Submit Request</>}
                        </Button>
                    </form>
                </div>
            </CardBox>
        </div>
    )
}