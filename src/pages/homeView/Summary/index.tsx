import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export const Summary:React.FC = () => {
    return <ResizablePanelGroup
    direction="horizontal"
    className="max-w-full rounded-lg border col-span-11 bg-red-400"
  >
    <ResizablePanel defaultSize={50}>
      {/* <div className="flex h-[200px] items-center justify-center p-6">
        <span className="font-semibold">One</span>
      </div> */}
      <Card className="min-h-full">
      <CardHeader>
        <CardTitle>Entradas de dinero</CardTitle>
        <CardDescription>Aca se ve el total de ingresos del mes</CardDescription>
      </CardHeader>
      <CardContent>
        <div>Hola</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>Hola</p>
      </CardFooter>
    </Card>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel defaultSize={50}>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Two</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Three</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
}