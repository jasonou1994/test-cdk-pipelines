#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { MyPipelineStack } from "../lib/test-cdk-pipelines-stack";

const app = new cdk.App();
new MyPipelineStack(app, "MyPipelineStack", {
  env: {
    account: "741740907498",
    region: "us-east-1",
  },
});

app.synth();
