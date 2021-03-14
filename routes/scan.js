const router = require("express").Router();
const { checkError } = require("../multerLogic");
const vision = require("@google-cloud/vision");
const mark = require("../markInfo");

async function quickstart(req, res) {
  try {
    const client = new vision.ImageAnnotatorClient({
      keyFilename: "./key.json",
    });
    const imageDesc = await checkError(req, res);
    //Performs text detection on the local file
    const [result] = await client.textDetection(imageDesc.path);
    const detections = result.textAnnotations;
    const [text, ...others] = detections;
    const value = text.description;

    const regexp = new RegExp(/[1-9][0-9]?/);
    const num = regexp.exec(value);
    const outputValue = mark[num];
    if (outputValue) {
      res.render("info", { outputValue });
    } else {
        res.render('infoError')
    }
  } catch (error) {
    console.log(error);
  }
}

router.get("/", async (req, res) => {
  res.send("welcome to the homepage");
});

router.post("/", quickstart);

module.exports = router;
