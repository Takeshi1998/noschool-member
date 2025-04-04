import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod";
import {parse} from "node-html-parser";
import puppeteer from "puppeteer";

const server = new McpServer({
    name: "noschool-member",
    version: "1.0.0",
});

    server.tool("get_staff_members", "スタッフメンバーを取得する", {
        num: z.number().describe("取得する人数").optional().default(10),
    }, async ({num}) => {
        // Puppeteerを起動してページのHTMLを取得
        const browser = await puppeteer.launch({headless: "shell"});
        const page = await browser.newPage();

        await page.goto("https://corp.noschool.asia/staff-introduction", {
            waitUntil: "domcontentloaded",
            timeout: 10000,
        });

        await page.waitForSelector("div.richText.sd p strong", { timeout: 5000 });


        const html = await page.content();
        await browser.close();

        const root = parse(html);

        const elements = root.querySelectorAll("div.richText.sd p strong");

        const names: string[] = [];
        elements.forEach(el => {
            let text = el.text.replace(/\u00a0/g, " ").trim();
            if (text.indexOf("/") !== -1) {
                text = text.split("/")[0].trim();
            }
            names.push(text);
        });

        const result = names.slice(0, num).join("\n");
        return {
            content: [
                {
                    type: "text",
                    text: result,
                },
            ],
        };
    });

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Example MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
