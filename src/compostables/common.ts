import { inject, InjectionKey } from "@vue/runtime-core";

export const APIStatus = {
  IDLE: "IDLE",
  RUNNING: "RUNNING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

interface ParsedObjectData {
  uri?: string;
}

interface ParsedObjectMark {
  type?: string;
}

interface ParsedObject {
  nodeType: string;
  data: ParsedObjectData;
  content?: ParsedObject[];
  marks?: ParsedObjectMark[];
  value?: string;
}

function _parseParagraphContent(parsedObj: ParsedObject) {
  let html = "";
  if (
    parsedObj.content &&
    parsedObj.content.length === 1 &&
    parsedObj.content[0].nodeType === "text"
  ) {
    html += parsedObj.content[0].value;
  } else {
    parsedObj.content?.forEach((paragraphContent) => {
      if (paragraphContent.nodeType === "text") {
        html += `${paragraphContent.value}`;
      }
      if (paragraphContent.nodeType === "hyperlink") {
        html += `<a href="${
          paragraphContent.data.uri
        }">${_parseParagraphContent(paragraphContent)}</a>`;
      }
    });
  }
  return html;
}

export function parseContent(parsedObj: ParsedObject) {
  let html = "";
  if (parsedObj.nodeType !== "document") {
    console.log("parsing non doucment object", parsedObj);
    return html;
  }
  parsedObj.content?.forEach((documentContent) => {
    if (documentContent.nodeType !== "paragraph") {
      console.log("parsing non paragraph object", parsedObj);
      return;
    }
    html += _parseParagraphContent(documentContent);
  });
  return html;
}

export function safeInject<T>(key: InjectionKey<T>) {
  const resolved = inject(key);
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`);
  }
  return resolved;
}
