// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";
// import PizZip from "pizzip";
// import Docxtemplater from "docxtemplater";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { formData } = body;

//     if (!formData) {
//       return NextResponse.json({ error: "Missing formData" }, { status: 400 });
//     }

//     /**
//      * ✅ IMPORTANT:
//      * Put your template file in:
//      * /public/templates/assessment-template.docx
//      *
//      * This docx must contain placeholders like:
//      * {{company}}, {{street}}, {{communication}}, etc.
//      */
//     const templatePath = path.join(
//       process.cwd(),
//       "public",
//       "templates",
//       "assessment-template.docx"
//     );

//     if (!fs.existsSync(templatePath)) {
//       return NextResponse.json(
//         {
//           error:
//             "Template not found. Please place assessment-template.docx inside public/templates/",
//         },
//         { status: 500 }
//       );
//     }

//     const content = fs.readFileSync(templatePath, "binary");

//     const zip = new PizZip(content);

//     const doc = new Docxtemplater(zip, {
//       paragraphLoop: true,
//       linebreaks: true,
//     });

//     doc.render(formData);

//     const docxBuffer = doc.getZip().generate({
//       type: "nodebuffer",
//       compression: "DEFLATE",
//     });

//     return new NextResponse(docxBuffer, {
//       headers: {
//         "Content-Type":
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         "Content-Disposition": `attachment; filename="Filled_Assessment_Form.docx"`,
//       },
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Failed to export DOCX" },
//       { status: 500 }
//     );
//   }
// }


// fix

// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";
// import PizZip from "pizzip";
// import Docxtemplater from "docxtemplater";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { formData } = body;

//     if (!formData || typeof formData !== "object") {
//       return NextResponse.json({ error: "Missing formData" }, { status: 400 });
//     }

//     // ✅ Template must be here:
//     // public/templates/assessment-template.docx
//     const templatePath = path.join(
//       process.cwd(),
//       "public",
//       "templates",
//       "assessment-template.docx"
//     );

//     if (!fs.existsSync(templatePath)) {
//       return NextResponse.json(
//         {
//           error:
//             "Template not found. Please place assessment-template.docx inside public/templates/",
//           templatePath,
//         },
//         { status: 500 }
//       );
//     }

//     const content = fs.readFileSync(templatePath, "binary");

//     let zip: PizZip;
//     try {
//       zip = new PizZip(content);
//     } catch (e: any) {
//       return NextResponse.json(
//         {
//           error: "Template file is not a valid DOCX (zip read failed).",
//           details: e?.message || String(e),
//         },
//         { status: 500 }
//       );
//     }

//     // ✅ Create docxtemplater instance
//     const doc = new Docxtemplater(zip, {
//       paragraphLoop: true,
//       linebreaks: true,
//     });

//     // ✅ Render placeholders
//     try {
//       doc.render(formData);
//     } catch (error: any) {
//       // ✅ THIS BLOCK IS THE MOST IMPORTANT FIX
//       // It returns full error info instead of "Multi error"
//       const err = error;

//       let formattedErrors: any[] = [];
//       try {
//         formattedErrors = err?.properties?.errors || [];
//       } catch (e) {}

//       return NextResponse.json(
//         {
//           error: err?.message || "DOCX template render failed",
//           explanation:
//             "This happens when placeholders like {{manual}} are broken/split in the DOCX template. Open the template and re-type the placeholders as plain text.",
//           details: formattedErrors.map((e: any) => ({
//             message: e?.message,
//             file: e?.properties?.file,
//             id: e?.properties?.id,
//             tag: e?.properties?.xtag,
//             context: e?.properties?.context,
//             explanation: e?.properties?.explanation,
//           })),
//         },
//         { status: 500 }
//       );
//     }

//     // ✅ Generate DOCX buffer
//     const docxBuffer = doc.getZip().generate({
//       type: "nodebuffer",
//       compression: "DEFLATE",
//     });

//     return new NextResponse(docxBuffer, {
//       headers: {
//         "Content-Type":
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         "Content-Disposition":
//           'attachment; filename="Filled_Assessment_Form.docx"',
//       },
//     });


//   } catch (err: any) {
//     return NextResponse.json(
//       {
//         error: err?.message || "Failed to export DOCX",
//       },
//       { status: 500 }
//     );
//   }
// }


// fix 2

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData } = body;

    if (!formData || typeof formData !== "object") {
      return NextResponse.json({ error: "Missing formData" }, { status: 400 });
    }

    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "assessment-template.docx"
    );

    if (!fs.existsSync(templatePath)) {
      return NextResponse.json(
        { error: "Template not found", templatePath },
        { status: 500 }
      );
    }

    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(formData);

    const docxBuffer = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    // ✅ FIX: Convert Buffer -> Uint8Array
    const uint8Array = new Uint8Array(docxBuffer);

    return new Response(uint8Array, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition":
          'attachment; filename="Filled_Assessment_Form.docx"',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to export DOCX" },
      { status: 500 }
    );
  }
}
