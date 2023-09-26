import { getHtml, getOpenGraph } from "../services/product.service";

exports.coupang = async (req, res, next) => {
  try {
    const productUrl = req.body.product_url;

    const html = await getHtml(productUrl);
    const openGraph = await getOpenGraph(html);

    if (openGraph) {
      res.status(200).json(openGraph);
    } else {
      res.status(404).json(null);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
