import './App.css'
import BrandList from './components/BrandList'
import DeviceList from './components/DeviceList'
import UserList from './components/UserList'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs"
function App(props:{token:string}) {
  return (
    <Tabs defaultValue="account" >
      <TabsList className="grid w-screen grid-cols-3">
        <TabsTrigger value="users">Пользователи</TabsTrigger>
        <TabsTrigger value="devices">Устройства</TabsTrigger>
        <TabsTrigger value="brands">Брэнды</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
       <UserList/>
      </TabsContent>
      <TabsContent value="devices">
        <DeviceList/>
      </TabsContent>
      <TabsContent value="brands">
        <BrandList/>
      </TabsContent>
    </Tabs>
  )
}

export default App
