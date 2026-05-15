"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdfParse = require("pdf-parse");
exports.parsePdf = (buffer) => pdfParse(buffer);
