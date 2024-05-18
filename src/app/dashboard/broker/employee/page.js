"use client";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "react-query";
import { store } from "@/redux/empRedux/store";
import { Provider } from "react-redux";
import EmpHome from "./EmpHome";

const queryClient = new QueryClient();

const MainHomePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="bg-gray-50 py-0 px-0 ml-1">
          <EmpHome />
        </div>
      </Provider>
    </QueryClientProvider>
  );
};
export default MainHomePage;
