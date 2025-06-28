import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BookTileGrid from "./BookTileGrid";
export default function BookTabs() {
  return (
    <Tabs defaultValue="Old">
      <TabsList className="mb-4">
        <TabsTrigger value="Old">Old Testament</TabsTrigger>
        <TabsTrigger value="New">New Testament</TabsTrigger>
      </TabsList>
      <TabsContent value="Old"><BookTileGrid testament="Old" /></TabsContent>
      <TabsContent value="New"><BookTileGrid testament="New" /></TabsContent>
    </Tabs>
  );
}
