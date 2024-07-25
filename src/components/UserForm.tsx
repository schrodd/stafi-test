import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { toProperCase } from "@/helpers/toProperCase"
import { userSchema } from "@/schemas/user.schema"
import { UserFormProps } from "@/types/userForm.types"
import { UserGenders } from "@/types/user.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "./ui/textarea"
import { Check, Plus } from "lucide-react"
import { Separator } from "./ui/separator"
import useTasksContext from "@/hooks/useTasksContext"
import TaskCard from "./TaskCard"
import TaskList from "./TaskList"

export default function UserForm({ placeholders }: UserFormProps) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: placeholders?.firstName ?? "",
      lastName: placeholders?.lastName ?? "",
      email: placeholders?.email ?? "",
      address: placeholders?.address ?? ""
    }
  })

  function onSubmit(values: z.infer<typeof userSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Card className="w-full md:w-auto">
      <CardHeader>
        <CardTitle>Nested form</CardTitle>
        <CardDescription>Stafi assessment</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4 md:gap-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 min-w-[300px]">
            <p className="text-lg font-bold mb-2">User data</p>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>Your email address will remain private.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Gender</SelectLabel>
                          {Object.values(UserGenders).map((g) => (
                            <SelectItem key={g} value={g}>
                              {toProperCase(g)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>Your address will remain private.</FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">
              Submit
              <Check size={16} className="ml-2" />
            </Button>
          </form>
        </Form>
        <Separator orientation="vertical" className="mx-5 h-auto" />
        <TaskList />
      </CardContent>
    </Card>
  )
}
