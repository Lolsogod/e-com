//import './App.css'
import BrandList from './components/BrandList'
import DeviceList from './components/DeviceList'
import UserList from './components/UserList'
import type { TrpcClient } from "./types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs"

function App(props:{ trpc: TrpcClient}) {
  const {trpc} = props
  return (
    <Tabs defaultValue="account" >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="users">Пользователи</TabsTrigger>
        <TabsTrigger value="devices">Устройства</TabsTrigger>
        <TabsTrigger value="brands">Брэнды</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
       <UserList trpc={trpc}/>
      </TabsContent>
      <TabsContent value="devices">
        <DeviceList trpc={trpc}/>
      </TabsContent>
      <TabsContent value="brands">
        <BrandList trpc={trpc}/>
      </TabsContent>
    </Tabs>
  )
}

export default App
