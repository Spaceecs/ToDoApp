import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TodosLists } from "../../screens";
import { DrawerParamList } from "../../shared";

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={TodosLists} />
        </Drawer.Navigator>
    );
};
