import { javascript } from './javascript';
import { react } from './react';
import { nodeExpress } from './nodeExpress';
import { mongodb } from './mongodb';
import { systemDesign } from './systemDesign';

export const knowledgeBase = {
  javascript,
  react,
  nodejs: nodeExpress.nodejs,
  express: nodeExpress.express,
  mongodb,
  ...systemDesign
};