import * as cdk from "@aws-cdk/core";
import {
  CodePipeline,
  CodePipelineSource,
  ManualApprovalStep,
  ShellStep,
} from "@aws-cdk/pipelines";
import { MyLambdaStack } from "./my-pipeline-lambda-stack";

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const oauth = cdk.SecretValue.secretsManager("Github");

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "MyPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "jasonou1994/test-cdk-pipelines",
          "master",
          { authentication: oauth }
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    const beta = pipeline.addStage(
      new MyPipelineAppStage(this, "beta", {
        env: {
          account: "741740907498",
          region: "us-east-1",
        },
      })
    );

    const prod = pipeline.addStage(
      new MyPipelineAppStage(this, "prod", {
        env: {
          account: "741740907498",
          region: "us-east-1",
        },
      })
    );
    prod.addPre(new ManualApprovalStep("approval"));
  }
}

class MyPipelineAppStage extends cdk.Stage {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const lambdaStack = new MyLambdaStack(this, "LambdaStack");
  }
}
