// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { expect, afterEach, vi, beforeEach } from 'vitest';
import {Default_data} from "../src/Utils/Default";

expect.extend(matchers);

afterEach(()=>{
    cleanup();
    vi.clearAllMocks();
});

beforeEach(()=>{
            const mockLocalStorage = (() => {
            let data = Default_data;
            return{
                getItem: (key:string):any =>{
                    if(Object.hasOwn(data,key)){
                        const obj_key = key as keyof (typeof Default_data);
                        return data[obj_key];
                    }
                    return undefined
                },

                setItem: (key:string, value:any) =>{
                    const val = String(value);
                    data = {
                        ...data,
                        [key]:val
                    };
                },

                length:0,
                clear:()=>{},
                key:():string|null=>{return null},
                removeItem:()=>{}

                
            }
        });
        window.localStorage = mockLocalStorage();
        Object.defineProperty(window, 'location', {
            value:{
                reload: () => {} 
            },
            writable:true
        })
});