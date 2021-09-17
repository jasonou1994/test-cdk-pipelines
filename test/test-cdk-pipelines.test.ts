import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as TestCdkPipelines from "../lib/test-cdk-pipelines-stack";

test("Empty Stack", () => {
  // const app = new cdk.App();
  // // WHEN
  // const stack = new TestCdkPipelines.TestCdkPipelinesStack(app, 'MyTestStack');
  // // THEN
  // expectCDK(stack).to(matchTemplate({
  //   "Resources": {}
  // }, MatchStyle.EXACT))
});
