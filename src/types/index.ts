/* eslint-disable no-unused-vars */
import { NextComponentType, NextPage, NextPageContext } from "next";
import { AppInitialProps } from "next/app";
import { Router } from "next/router";
import { ReactNode } from "react";
import { IMutation, IQuery, ISubscription } from "./schemas";
export * from "./schemas";

export type Layout = (page: ReactNode) => ReactNode;

export type NextPageFC<L = any, P = any, IP = P> = NextPage<P, IP> & L;
export type QueryTypeChildren = { children: ReactNode };

export type AppPropsWithLayout<L = any, P = any> = AppInitialProps & {
  Component: NextComponentType<NextPageContext, any, P> & L;
  router: Router;
  __N_SSG?: boolean | undefined;
  __N_SSP?: boolean | undefined;
};

export type IQueryFilter<T extends keyof IQuery> = Pick<IQuery, T>;
export type IMutationFilter<T extends keyof IMutation> = Pick<IMutation, T>;
export type ISubscriptionFilter<T extends keyof ISubscription> = Pick<
  ISubscription,
  T
>;

export type IGraphQLResponseRoot = {
  data?: IQuery | IMutation;
  errors?: Array<IGraphQLResponseError>;
};

interface IGraphQLResponseError {
  message: string;
  locations?: Array<IGraphQLResponseErrorLocation>;
  [propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
  line: number;
  column: number;
}
