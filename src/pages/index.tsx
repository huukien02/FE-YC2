import React, { useEffect, useState, createContext, useContext } from "react";
import DefaultLayout from "../layout";
import classNames from "classnames/bind";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export default function Index() {
  return (
    <DefaultLayout>
      <div>Home Page</div>
    </DefaultLayout>
  );
}
