const express = require("express");
const router = express.Router();
const multer = require("multer");
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { auth } = require("../middleware/auth");

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //destination 어디에 파일이 저장되는지 server/uploads에 파일 올림
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    //어떠한 이름으로 파일 저장할건지
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

//client에서 보내는 request를 받을 수 있습니다.
router.post("/image", (req, res) => {
  //가져온 이미지를 저장해준다.
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.fileName,
    });
    //어디에 저장이 되었는지 , 파일 네임을 가져옵니다.
  });
  //multer 라이브러리 사용합니다. (파일 저장)
});

router.post("/", (req, res) => {
  //받아온 정보들을 DB에 넣어준다.

  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  //product collection에 들어 있는 모든 상품 정보를 가져옵니다. writer_id를 이용해서 모든 값을 가져오도록

  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  //   LIMIT 처음 데이터를 가져올때와 더보기 버튼을 눌러서 가져올때 얼마나 많은 데이터를
  //   한번에 가져오는지

  //    SKIP 어디서 부터 데이터를 가져오는지에 대한 위치 처음에는 0부터 시작 LIMIT이 6이라면
  //    다음번에는 2rd Skip  = 0 + 6  => 6이후부터 가져옴
  let term = req.body.searchTerm;

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
      console.log("key", key);
      console.log(findArgs);
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0], //0보다 큰
          $lte: req.body.filters[key][1], //9999보다 작은
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  console.log(term);

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        //ex [{},{},{}] => productInfo.length = 3  ==> postSize
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        //ex [{},{},{}] => productInfo.length = 3  ==> postSize
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  }
});

router.get("/products_by_id", (req, res) => {
  //productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져옵니다.
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");

    productIds = ids.map((item) => {
      return item;
    });
  }

  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
    });
});

module.exports = router;
