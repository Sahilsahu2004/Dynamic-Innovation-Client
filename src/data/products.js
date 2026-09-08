import wovenBagsSacks from '../assets/brand/woven-bags-sacks.png'
import boppPrinted from '../assets/brand/bopp-printed-bags.png'
import gussetedBox from '../assets/brand/gusseted-box-bags.png'
import wovenFabric from '../assets/brand/woven-fabric.png'
import laminatedFabric from '../assets/brand/laminated-fabric.png'
import ldHmLiners from '../assets/brand/ld-hm-liners.png'

export const INDUSTRIES = ['All', 'Agriculture & Food Grains', 'Industrial & Construction']

// Indicative pricing only — actual manufacturing prices depend on GSM,
// size, print colours, quantity and liner requirements. Shown as
// "starting from" estimates; replace with confirmed price lists
// whenever the client shares them.
export const PRODUCTS = [
  {
    id: 'woven-bags-sacks',
    title: 'HDPE/PP Woven Bags & Sacks',
    desc: 'Durable, flexible, and cost-effective bulk bags available with/without liners, anti-skid weaves, and UV stabilization.',
    img: wovenBagsSacks,
    dir: 'up',
    unit: 'per piece',
    priceFrom: 8,
    moq: '5,000 pcs',
    structure: 'Woven Sack',
    industries: ['Agriculture & Food Grains', 'Industrial & Construction'],
    specs: [
      ['Capacity', '5 kg – 75 kg'],
      ['Construction', 'With/without liner, gusseted, box'],
      ['Fabric GSM', 'As per requirement'],
      ['Printing', 'Multi-colour, BOPP or flexo'],
      ['Options', 'UV stabilised, anti-skid, perforated'],
    ],
  },
  {
    id: 'bopp-printed-bags',
    title: 'BOPP Printed Bags',
    desc: 'High-clarity, multi-color printed packaging with high gloss and tensile strength for maximum shelf impact.',
    img: boppPrinted,
    dir: 'left',
    unit: 'per piece',
    priceFrom: 11,
    moq: '5,000 pcs',
    structure: 'Printed Bag',
    industries: ['Agriculture & Food Grains'],
    specs: [
      ['Capacity', '1 kg – 50 kg'],
      ['Lamination', 'BOPP gloss or matte'],
      ['Printing', 'Up to 8 colours, rotogravure'],
      ['Finish', 'Shelf-ready retail grade'],
      ['Options', 'Gusseted, block-bottom'],
    ],
  },
  {
    id: 'gusseted-box-bags',
    title: 'Gusseted & Box Bags',
    desc: 'Shape-retaining designs built for efficient stacking, palletization, and warehouse space optimization.',
    img: gussetedBox,
    dir: 'right',
    unit: 'per piece',
    priceFrom: 14,
    moq: '2,000 pcs',
    structure: 'Gusseted / Box',
    industries: ['Agriculture & Food Grains', 'Industrial & Construction'],
    specs: [
      ['Capacity', '250 g – 25 kg'],
      ['Construction', 'Gusseted, stand-up box'],
      ['Material', 'Kraft, laminated PP'],
      ['Closure', 'Heat-seal, zipper'],
      ['Finish', 'Matte or printed'],
    ],
  },
  {
    id: 'woven-laminated-fabric',
    title: 'Woven & Laminated Fabrics',
    desc: 'Tubular and flat fabrics (varying GSM/widths) coated with a PP layer to block out moisture and dust.',
    img: wovenFabric,
    secondaryImg: laminatedFabric,
    dir: 'left',
    unit: 'per kg',
    priceFrom: 95,
    moq: '500 kg',
    structure: 'Fabric (Roll)',
    industries: ['Industrial & Construction'],
    specs: [
      ['Form', 'Tubular or flat'],
      ['Width', 'As per requirement'],
      ['Fabric GSM', 'As per requirement'],
      ['Coating', 'PP lamination available'],
      ['Options', 'UV stabilised, plain or printed'],
    ],
  },
  {
    id: 'liners-fibc',
    title: 'LD/HM Liners & FIBC Jumbo Bags',
    desc: 'Protective inner liners for hygroscopic goods, plus heavy-duty bulk containers custom-built for large loads.',
    img: ldHmLiners,
    dir: 'right',
    unit: 'per piece',
    priceFrom: 6,
    moq: '10,000 pcs',
    structure: 'Liner / FIBC',
    industries: ['Industrial & Construction', 'Agriculture & Food Grains'],
    specs: [
      ['Liner size', 'Width and length as per requirement'],
      ['FIBC capacity', 'As per requirement (bulk tonnage)'],
      ['Material', 'LD/HM polyethylene, woven PP (FIBC)'],
      ['Closure', 'Loop, liner and closure options'],
      ['Use case', 'Moisture-sensitive & hygroscopic goods, bulk loads'],
    ],
  },
]

export const formatINR = (n) =>
  '₹' + n.toLocaleString('en-IN')
