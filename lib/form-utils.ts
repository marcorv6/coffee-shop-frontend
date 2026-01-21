/**
 * Form utilities and helpers for react-hook-form + zod integration
 * 
 * Example usage:
 * 
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import { z } from 'zod';
 * 
 * const formSchema = z.object({
 *   email: z.string().email('Invalid email address'),
 *   name: z.string().min(2, 'Name must be at least 2 characters'),
 * });
 * 
 * type FormValues = z.infer<typeof formSchema>;
 * 
 * function MyForm() {
 *   const form = useForm<FormValues>({
 *     resolver: zodResolver(formSchema),
 *     defaultValues: {
 *       email: '',
 *       name: '',
 *     },
 *   });
 * 
 *   const onSubmit = (data: FormValues) => {
 *     console.log(data);
 *   };
 * 
 *   return (
 *     <form onSubmit={form.handleSubmit(onSubmit)}>
 *       {/* form fields */}
 *     </form>
 *   );
 * }
 */

export {};
