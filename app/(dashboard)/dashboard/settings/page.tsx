import { CreateProfileOne } from '@/components/forms/user-profile-stepper/create-profile';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <h2 className="text-3xl font-bold tracking-tight">
            Settings
          </h2>      
          <Tabs defaultValue="linkedAccounts" className="fit">
      <TabsList>
        <TabsTrigger value="linkedAccounts">Linked Accounts</TabsTrigger>
        <TabsTrigger value="cname">CNAME</TabsTrigger>
        <TabsTrigger value="yourAccount">Your Account</TabsTrigger>
        <TabsTrigger value="organization">Organization</TabsTrigger>
      </TabsList>
        <TabsContent value="linkedAccounts">Link all your accounts here.</TabsContent>
        <TabsContent value="cname">Connect your domains here.</TabsContent>
        <TabsContent value="yourAccount">Manage your account.</TabsContent>
        <TabsContent value="organization">Manage your organization.</TabsContent>

    </Tabs>

      </div>
    </ScrollArea>
  );
}
