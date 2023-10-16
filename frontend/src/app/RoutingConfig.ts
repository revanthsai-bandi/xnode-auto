import { Type } from "@angular/core";
import { GenericScreenComponent } from "./generic-screen/generic-screen.component";
import { PrimeIcons } from "primeng/api";

export const routingConfig: { path: string, component: Type<any>, label: string, icon: string, data: any }[] = [
    {
        path: 'screen-one',
        component: GenericScreenComponent,
        label: 'Screen One',
        icon: '/menu-item-1.svg',
        data: {
            id: '1',
            title: 'Screen1',
            components: [
                {
                    type: 'input',
                    data: 'Some data'
                },
                {
                    type: 'text',
                    data: 'Some data'
                }
            ],
            layoutType: 'CONTAINER',
            widgets: [
                { "id": "widget1", "type": "text", "data": { "content": "Welcome to the Home Page!" }, "col": 1, "row": 1, "sizeX": 1, "sizeY": 1 },
                { "id": "widget2", "type": "image", "data": { "src": "assets/image.jpg" }, "col": 2, "row": 1, "sizeX": 1, "sizeY": 1 }
            ]
        },

    },
    {
        path: 'screen-two',
        component: GenericScreenComponent,
        label: 'Screen Two',
        icon: '/menu-item-2.svg',
        data: {
            id: '2',
            title: 'Screen2',
            layoutType: "LIST",
            list: [
                { "id": "widget1", "type": "text", "data": { "content": "Welcome to the Home Page!" }, "col": 1, "row": 1, "sizeX": 1, "sizeY": 1 },
                { "id": "widget2", "type": "image", "data": { "src": "assets/image.jpg" }, "col": 2, "row": 1, "sizeX": 1, "sizeY": 1 }
            ]
        },

    },
    {
        path: 'screen-three',
        component: GenericScreenComponent,
        label: 'Screen Three',
        icon: '/menu-item-3.svg',
        data: {
            id: '2',
            title: 'Screen2',
            layoutType: "TABLE",
            table: [
                { "id": "widget1", "type": "text", "data": { "content": "Welcome to the Home Page!" }, "col": 1, "row": 1, "sizeX": 1, "sizeY": 1 },
                { "id": "widget2", "type": "image", "data": { "src": "assets/image.jpg" }, "col": 2, "row": 1, "sizeX": 1, "sizeY": 1 }
            ]
        },

    }

];
