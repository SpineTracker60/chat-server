import axios from "axios";
import cheerio from "cheerio";

exports.getHtml = async (productUrl) => {
  try {
    return await axios.get(productUrl, {
      headers: {
        Host: "www.coupang.com",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getOpenGraph = async (html) => {
  try {
    var $ = cheerio.load(html.data);
    const properties = ["title", "description", "image", "url"];
    const meta = {};

    properties.forEach((p) => {
      let content = $(`meta[property="og:${p}"]`).attr("content");
      if (content) {
        if (p === "image") {
          content = content.substring(2, content.length);
        }
        meta[p] = content;
      }
    });
    meta["productId"] = parseInt(meta["url"].split("/")[5]);

    return meta;
  } catch (error) {
    console.error(error);
  }
};
