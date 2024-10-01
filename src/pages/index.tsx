import React from "react";
import DefaultLayout from "../layout";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import Blogs from "../components/blogs";
const cx = classNames.bind(styles);

export default function Index() {
  return (
    <DefaultLayout>
      <div>Home Page </div>
    </DefaultLayout>
  );
}
