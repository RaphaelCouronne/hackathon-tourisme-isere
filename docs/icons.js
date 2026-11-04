const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const lu = require("react-icons/lu");

const icons = {
  mountain: lu.LuMountain,
  map: lu.LuMap,
  route: lu.LuRoute,
  sun: lu.LuCloudSun,
  leaf: lu.LuLeaf,
  pin: lu.LuMapPin,
  database: lu.LuDatabase,
  shuffle: lu.LuShuffle,
  users: lu.LuUsers,
  target: lu.LuTarget,
  clock: lu.LuClock,
  sprout: lu.LuSprout,
};

const colors = { dark: "#102A24", accent: "#E39A3B" };

const outDir = path.join(__dirname, "icons");
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  for (const [name, Icon] of Object.entries(icons)) {
    for (const [cname, cval] of Object.entries(colors)) {
      const svg = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Icon, { size: 512, color: cval, strokeWidth: 1.5 })
      );
      const buf = await sharp(Buffer.from(svg)).png().toBuffer();
      fs.writeFileSync(path.join(outDir, `${name}-${cname}.png`), buf);
    }
  }
  console.log("icons:", fs.readdirSync(outDir).length);
})();
