import { CspPolicies } from "@main/csp";

CspPolicies["github.com"] = [...CspPolicies["github.com"], "media-src"];
CspPolicies["raw.githubusercontent.com"] = [...CspPolicies["raw.githubusercontent.com"], "media-src"];