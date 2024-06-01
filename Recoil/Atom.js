import { atom } from 'recoil';
import {  View } from "react-native"
// Define an atom to hold your state
export const bottomSheetContent = atom({
  key: 'view', // unique ID (with respect to other atoms/selectors)
  default: <View></View>, // default value (aka initial value)
});

export const  bottomSheetVisiblity=atom({
    key:'BSheetVisibility',
    default:false
})

export const userdata=atom({
  key:'userData',
  default:{id:" ",userName:" ",dpLink:" "}
})
