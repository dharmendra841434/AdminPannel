import React, { useEffect } from "react";
import Layout from "../app/layout/Layout";
import ClientList from "../ui/ClientList";
import { useSelector, useDispatch } from "react-redux";
import { getArrayElements } from "../features/appSlice";
const arr = ["dhruv", "kumar", "Dharmendra"];
const Dashboard = () => {
  // const dispatch = useDispatch();
  // const dk = useSelector((state) => state.app.isAuthenticated);

  // const data = useSelector((state) => state.app.filter);
  // console.log(data);
  // useEffect(() => {
  //   dispatch(getArrayElements(arr));
  // }, []);

  return (
    <Layout>
      <ClientList />
    </Layout>
  );
};

export default Dashboard;
