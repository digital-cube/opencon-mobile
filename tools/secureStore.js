import React from "react";
import * as SecureStore from "expo-secure-store";

export async function storageSetItem(key, value) {
  if (!value) {
    return;
  }
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (err) {
    //
  }
}

export async function storageGetItem(key) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (err) {
    return null;
  }
}

export async function storageDeleteItem(key) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (err) {
    //
  }
}
