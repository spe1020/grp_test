import React, { useState, useMemo } from "react";
import {
  Treemap, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, Cell, LabelList,
} from "recharts";
import {
  X, Search, ArrowUpDown, TrendingDown, Layers, Boxes, Factory, Scissors,
} from "lucide-react";

const PARTS = [{"pn":"GRPXT36200","desc":"Grippy Extreme-Tack 36in x 100ft, Charcoal","service":"Extreme-Tack / Traffic","tack":"Extreme","width":36,"weight":8,"volume":366340,"np":[{"name":"Needlepunch B","alloc":0.63,"exworks":1.883,"freight":0.173,"landed":2.057},{"name":"Needlepunch A","alloc":0.37,"exworks":1.889,"freight":0.127,"landed":2.016}],"lam":[{"name":"Laminator M","alloc":0.59,"exworks":0.71,"freight":0.1,"landed":0.81},{"name":"Laminator F","alloc":0.41,"exworks":0.785,"freight":0.194,"landed":0.979}],"risk":"Critical","volShare":10.82},{"pn":"GRP36202","desc":"Grippy Ultra-Duty 36in x 60ft, Gray","service":"High-Tack Adhesive","tack":"High","width":36,"weight":8,"volume":290184,"np":[{"name":"Needlepunch B","alloc":1.0,"exworks":2.124,"freight":0.208,"landed":2.332}],"lam":[{"name":"Laminator T","alloc":1.0,"exworks":0.968,"freight":0.157,"landed":1.125}],"risk":"Critical","volShare":8.57},{"pn":"GRPXT48200","desc":"Grippy Extreme-Tack 48in x 100ft, Charcoal","service":"Extreme-Tack / Traffic","tack":"Extreme","width":48,"weight":8,"volume":319213,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":1.702,"freight":0.117,"landed":1.819}],"lam":[{"name":"Laminator M","alloc":1.0,"exworks":0.929,"freight":0.088,"landed":1.017}],"risk":"Critical","volShare":9.43},{"pn":"GRPPE36201","desc":"Grippy PET 36in x 60ft, Slate","service":"PET Grippy","tack":"High","width":36,"weight":8,"volume":170597,"np":[{"name":"Needlepunch B","alloc":1.0,"exworks":2.254,"freight":0.171,"landed":2.425},{"name":"Needlepunch A","alloc":0.0,"exworks":1.732,"freight":0.109,"landed":1.841,"inactive":true}],"lam":[{"name":"Laminator M","alloc":1.0,"exworks":0.835,"freight":0.125,"landed":0.96},{"name":"Laminator F","alloc":0.0,"exworks":0.705,"freight":0.199,"landed":0.904,"inactive":true}],"risk":"Critical","volShare":5.04},{"pn":"GRP72201","desc":"Grippy Ultra-Duty 72in x 100ft, Black","service":"High-Tack Adhesive","tack":"High","width":72,"weight":8,"volume":166206,"np":[{"name":"Needlepunch B","alloc":1.0,"exworks":2.11,"freight":0.197,"landed":2.307}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.843,"freight":0.203,"landed":1.046},{"name":"Laminator M","alloc":0.0,"exworks":0.794,"freight":0.087,"landed":0.881,"inactive":true}],"risk":"Critical","volShare":4.91},{"pn":"GRPSB48200","desc":"Grippy Safety Border 48in x 60ft, Yellow/Black","service":"Safety Border","tack":"High","width":48,"weight":11,"volume":154653,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":1.917,"freight":0.165,"landed":2.082}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.926,"freight":0.282,"landed":1.209}],"risk":"Critical","volShare":4.57},{"pn":"GRP36206","desc":"Grippy Ultra-Duty 36in x 25ft Starter, Gray","service":"High-Tack Adhesive","tack":"High","width":36,"weight":8,"volume":165729,"np":[{"name":"Needlepunch C","alloc":1.0,"exworks":1.561,"freight":0.234,"landed":1.795}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.811,"freight":0.21,"landed":1.021}],"risk":"Critical","volShare":4.89},{"pn":"GRPPE36204","desc":"Grippy PET 36in x 60ft, Smoke","service":"PET Grippy","tack":"High","width":36,"weight":8,"volume":135036,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":2.05,"freight":0.128,"landed":2.179}],"lam":[{"name":"Laminator T","alloc":1.0,"exworks":0.833,"freight":0.156,"landed":0.989}],"risk":"Critical","volShare":3.99},{"pn":"GRP36204","desc":"Grippy Traffic Mat 36in x 100ft, Charcoal","service":"Extreme-Tack / Traffic","tack":"Extreme","width":36,"weight":16,"volume":119614,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":2.238,"freight":0.137,"landed":2.374},{"name":"Needlepunch C","alloc":0.0,"exworks":1.636,"freight":0.236,"landed":1.873,"inactive":true}],"lam":[{"name":"Laminator F","alloc":0.61,"exworks":0.91,"freight":0.223,"landed":1.132},{"name":"Laminator T","alloc":0.39,"exworks":1.114,"freight":0.156,"landed":1.27}],"risk":"High","volShare":3.53},{"pn":"GRPCP36200","desc":"Grippy Carpet-Protection 36in x 50ft, Clear","service":"Carpet Protection","tack":"Standard","width":36,"weight":6,"volume":132287,"np":[{"name":"Needlepunch B","alloc":1.0,"exworks":1.785,"freight":0.182,"landed":1.967}],"lam":[{"name":"Laminator T","alloc":1.0,"exworks":0.851,"freight":0.133,"landed":0.983}],"risk":"Critical","volShare":3.91},{"pn":"GRPBB36200","desc":"Grippy Berber 36in x 60ft, Gray","service":"Textured (Berber)","tack":"High","width":36,"weight":11,"volume":99969,"np":[{"name":"Needlepunch B","alloc":1.0,"exworks":2.547,"freight":0.203,"landed":2.749}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.749,"freight":0.249,"landed":0.998}],"risk":"Critical","volShare":2.95},{"pn":"GRPFR36201","desc":"Grippy Flame-Resistant 36in x 100ft, Black","service":"Flame-Resistant","tack":"High","width":36,"weight":8,"volume":114541,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":1.696,"freight":0.11,"landed":1.806}],"lam":[{"name":"Laminator T","alloc":1.0,"exworks":1.091,"freight":0.133,"landed":1.224},{"name":"Laminator M","alloc":0.0,"exworks":0.76,"freight":0.105,"landed":0.865,"inactive":true}],"risk":"Critical","volShare":3.38},{"pn":"GRPFR48200","desc":"Grippy Flame-Resistant 48in x 100ft, Gray","service":"Flame-Resistant","tack":"High","width":48,"weight":8,"volume":117793,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":1.681,"freight":0.167,"landed":1.848}],"lam":[{"name":"Laminator M","alloc":0.74,"exworks":0.722,"freight":0.097,"landed":0.819},{"name":"Laminator T","alloc":0.26,"exworks":1.149,"freight":0.186,"landed":1.334}],"risk":"High","volShare":3.48},{"pn":"GRPPT36202","desc":"Grippy Patch 36in x 60ft, Burgundy","service":"Textured (Patch)","tack":"High","width":36,"weight":11,"volume":101433,"np":[{"name":"Needlepunch B","alloc":1.0,"exworks":2.123,"freight":0.182,"landed":2.304}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.668,"freight":0.273,"landed":0.941},{"name":"Laminator T","alloc":0.0,"exworks":1.028,"freight":0.147,"landed":1.175,"inactive":true}],"risk":"Critical","volShare":3.0},{"pn":"MAT32101","desc":"Grippy Mat Roll 32in x 100ft, Black","service":"Mat Roll","tack":"High","width":32,"weight":8,"volume":79974,"np":[{"name":"Needlepunch B","alloc":0.59,"exworks":2.116,"freight":0.162,"landed":2.278},{"name":"Needlepunch C","alloc":0.41,"exworks":1.944,"freight":0.246,"landed":2.19}],"lam":[{"name":"Laminator T","alloc":1.0,"exworks":1.176,"freight":0.161,"landed":1.337},{"name":"Laminator F","alloc":0.0,"exworks":0.527,"freight":0.173,"landed":0.7,"inactive":true}],"risk":"High","volShare":2.36},{"pn":"GRP36200","desc":"Grippy Ultra-Duty 36in x 100ft, Gray","service":"High-Tack Adhesive","tack":"High","width":36,"weight":8,"volume":97403,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":1.932,"freight":0.163,"landed":2.095}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.617,"freight":0.19,"landed":0.806}],"risk":"Critical","volShare":2.88},{"pn":"GRPPE36203","desc":"Grippy PET 36in x 60ft, Oatmeal","service":"PET Grippy","tack":"High","width":36,"weight":8,"volume":86236,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":1.669,"freight":0.169,"landed":1.838}],"lam":[{"name":"Laminator T","alloc":1.0,"exworks":1.066,"freight":0.117,"landed":1.183}],"risk":"Critical","volShare":2.55},{"pn":"MAT32100","desc":"Grippy Mat Roll 32in x 100ft, Gray","service":"Mat Roll","tack":"High","width":32,"weight":8,"volume":77907,"np":[{"name":"Needlepunch B","alloc":0.6,"exworks":1.889,"freight":0.23,"landed":2.119},{"name":"Needlepunch C","alloc":0.4,"exworks":1.876,"freight":0.218,"landed":2.093}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.739,"freight":0.187,"landed":0.926}],"risk":"High","volShare":2.3},{"pn":"GRP48201","desc":"Grippy Ultra-Duty 48in x 100ft, Black","service":"High-Tack Adhesive","tack":"High","width":48,"weight":8,"volume":70103,"np":[{"name":"Needlepunch B","alloc":0.71,"exworks":2.193,"freight":0.174,"landed":2.368},{"name":"Needlepunch C","alloc":0.29,"exworks":1.703,"freight":0.191,"landed":1.894}],"lam":[{"name":"Laminator F","alloc":0.64,"exworks":0.703,"freight":0.213,"landed":0.915},{"name":"Laminator T","alloc":0.36,"exworks":1.199,"freight":0.17,"landed":1.369}],"risk":"Low","volShare":2.07},{"pn":"GRP72204","desc":"Grippy Traffic Mat 72in x 100ft, Charcoal","service":"Extreme-Tack / Traffic","tack":"Extreme","width":72,"weight":16,"volume":52983,"np":[{"name":"Needlepunch C","alloc":0.56,"exworks":1.806,"freight":0.309,"landed":2.115},{"name":"Needlepunch A","alloc":0.44,"exworks":2.476,"freight":0.158,"landed":2.634}],"lam":[{"name":"Laminator M","alloc":1.0,"exworks":1.038,"freight":0.149,"landed":1.187}],"risk":"Medium","volShare":1.56},{"pn":"GRP36201","desc":"Grippy Ultra-Duty 36in x 50ft, Black","service":"High-Tack Adhesive","tack":"High","width":36,"weight":8,"volume":62557,"np":[{"name":"Needlepunch C","alloc":1.0,"exworks":1.678,"freight":0.242,"landed":1.92}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.85,"freight":0.176,"landed":1.026},{"name":"Laminator T","alloc":0.0,"exworks":0.952,"freight":0.176,"landed":1.127,"inactive":true}],"risk":"Critical","volShare":1.85},{"pn":"GRPXT72200","desc":"Grippy Extreme-Tack 72in x 100ft, True Black","service":"Extreme-Tack / Traffic","tack":"Extreme","width":72,"weight":8,"volume":57657,"np":[{"name":"Needlepunch A","alloc":0.73,"exworks":1.648,"freight":0.174,"landed":1.823},{"name":"Needlepunch C","alloc":0.27,"exworks":1.605,"freight":0.205,"landed":1.81}],"lam":[{"name":"Laminator T","alloc":1.0,"exworks":1.193,"freight":0.17,"landed":1.363}],"risk":"Medium","volShare":1.7},{"pn":"GRP48200","desc":"Grippy Ultra-Duty 48in x 100ft, Gray","service":"High-Tack Adhesive","tack":"High","width":48,"weight":8,"volume":58610,"np":[{"name":"Needlepunch C","alloc":0.6,"exworks":1.677,"freight":0.203,"landed":1.879},{"name":"Needlepunch A","alloc":0.4,"exworks":1.619,"freight":0.177,"landed":1.796}],"lam":[{"name":"Laminator T","alloc":1.0,"exworks":0.888,"freight":0.186,"landed":1.074}],"risk":"Medium","volShare":1.73},{"pn":"GRPAM48200","desc":"Grippy Antimicrobial 48in x 100ft, Gray","service":"High-Tack Adhesive","tack":"High","width":48,"weight":8,"volume":49674,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":1.786,"freight":0.132,"landed":1.918}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.616,"freight":0.233,"landed":0.848}],"risk":"High","volShare":1.47},{"pn":"MAT24100","desc":"Grippy Mat Roll 24in x 100ft, Gray","service":"Mat Roll","tack":"High","width":24,"weight":8,"volume":36770,"np":[{"name":"Needlepunch B","alloc":0.73,"exworks":2.207,"freight":0.182,"landed":2.389},{"name":"Needlepunch A","alloc":0.27,"exworks":1.702,"freight":0.11,"landed":1.811}],"lam":[{"name":"Laminator M","alloc":0.66,"exworks":0.791,"freight":0.112,"landed":0.904},{"name":"Laminator F","alloc":0.34,"exworks":0.678,"freight":0.189,"landed":0.867}],"risk":"Low","volShare":1.09},{"pn":"GRP48204","desc":"Grippy Traffic Mat 48in x 100ft, Charcoal","service":"Extreme-Tack / Traffic","tack":"Extreme","width":48,"weight":16,"volume":31900,"np":[{"name":"Needlepunch C","alloc":0.56,"exworks":2.209,"freight":0.261,"landed":2.47},{"name":"Needlepunch A","alloc":0.44,"exworks":2.129,"freight":0.186,"landed":2.315}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.821,"freight":0.256,"landed":1.077}],"risk":"Medium","volShare":0.94},{"pn":"GRP72200","desc":"Grippy Ultra-Duty 72in x 100ft, Gray","service":"High-Tack Adhesive","tack":"High","width":72,"weight":8,"volume":31019,"np":[{"name":"Needlepunch C","alloc":0.63,"exworks":1.67,"freight":0.266,"landed":1.936},{"name":"Needlepunch B","alloc":0.37,"exworks":1.808,"freight":0.191,"landed":1.998}],"lam":[{"name":"Laminator T","alloc":1.0,"exworks":1.155,"freight":0.163,"landed":1.318}],"risk":"Medium","volShare":0.92},{"pn":"GRPCP36201","desc":"Grippy Carpet-Protection 36in x 100ft, Clear","service":"Carpet Protection","tack":"Standard","width":36,"weight":6,"volume":23363,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":1.927,"freight":0.106,"landed":2.033}],"lam":[{"name":"Laminator M","alloc":1.0,"exworks":0.871,"freight":0.089,"landed":0.959}],"risk":"High","volShare":0.69},{"pn":"GRP72210","desc":"Grippy Ultra-Duty 72in x 100ft, True Black","service":"High-Tack Adhesive","tack":"High","width":72,"weight":16,"volume":16797,"np":[{"name":"Needlepunch B","alloc":0.63,"exworks":2.155,"freight":0.201,"landed":2.356},{"name":"Needlepunch A","alloc":0.37,"exworks":1.864,"freight":0.162,"landed":2.026}],"lam":[{"name":"Laminator T","alloc":0.71,"exworks":1.34,"freight":0.17,"landed":1.51},{"name":"Laminator M","alloc":0.29,"exworks":0.921,"freight":0.16,"landed":1.081}],"risk":"Low","volShare":0.5},{"pn":"GRPPE36202","desc":"Grippy PET 36in x 60ft, Denim","service":"PET Grippy","tack":"High","width":36,"weight":8,"volume":21719,"np":[{"name":"Needlepunch C","alloc":1.0,"exworks":1.416,"freight":0.274,"landed":1.69}],"lam":[{"name":"Laminator M","alloc":0.57,"exworks":0.718,"freight":0.13,"landed":0.849},{"name":"Laminator T","alloc":0.43,"exworks":1.118,"freight":0.154,"landed":1.272}],"risk":"Medium","volShare":0.64},{"pn":"GRPAM36200","desc":"Grippy Antimicrobial 36in x 100ft, Gray","service":"High-Tack Adhesive","tack":"High","width":36,"weight":8,"volume":19646,"np":[{"name":"Needlepunch A","alloc":0.58,"exworks":2.045,"freight":0.118,"landed":2.163},{"name":"Needlepunch C","alloc":0.42,"exworks":1.765,"freight":0.234,"landed":1.999}],"lam":[{"name":"Laminator M","alloc":0.7,"exworks":0.738,"freight":0.125,"landed":0.863},{"name":"Laminator F","alloc":0.3,"exworks":0.708,"freight":0.18,"landed":0.889}],"risk":"Low","volShare":0.58},{"pn":"GRPSB72200","desc":"Grippy Safety Border 72in x 60ft, Yellow/Black","service":"Safety Border","tack":"High","width":72,"weight":11,"volume":10102,"np":[{"name":"Needlepunch A","alloc":0.66,"exworks":2.088,"freight":0.168,"landed":2.256},{"name":"Needlepunch B","alloc":0.34,"exworks":1.845,"freight":0.187,"landed":2.032}],"lam":[{"name":"Laminator T","alloc":1.0,"exworks":1.181,"freight":0.203,"landed":1.384}],"risk":"Medium","volShare":0.3},{"pn":"GRP48210","desc":"Grippy Ultra-Duty 48in x 100ft, True Black","service":"High-Tack Adhesive","tack":"High","width":48,"weight":16,"volume":9327,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":2.268,"freight":0.167,"landed":2.436}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.849,"freight":0.223,"landed":1.071}],"risk":"High","volShare":0.28},{"pn":"MAT36100","desc":"Grippy Mat Roll 36in x 100ft, Gray","service":"Mat Roll","tack":"High","width":36,"weight":8,"volume":8309,"np":[{"name":"Needlepunch B","alloc":1.0,"exworks":2.089,"freight":0.192,"landed":2.281},{"name":"Needlepunch A","alloc":0.0,"exworks":1.285,"freight":0.144,"landed":1.429,"inactive":true}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.742,"freight":0.204,"landed":0.946}],"risk":"High","volShare":0.25},{"pn":"GRPPT36203","desc":"Grippy Patch 36in x 60ft, Black","service":"Textured (Patch)","tack":"High","width":36,"weight":11,"volume":7902,"np":[{"name":"Needlepunch A","alloc":0.69,"exworks":1.68,"freight":0.168,"landed":1.848},{"name":"Needlepunch C","alloc":0.31,"exworks":1.924,"freight":0.296,"landed":2.22}],"lam":[{"name":"Laminator M","alloc":1.0,"exworks":0.875,"freight":0.133,"landed":1.008}],"risk":"Medium","volShare":0.23},{"pn":"GRP36210","desc":"Grippy Ultra-Duty 36in x 100ft, True Black","service":"High-Tack Adhesive","tack":"High","width":36,"weight":16,"volume":6315,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":2.292,"freight":0.21,"landed":2.502}],"lam":[{"name":"Laminator M","alloc":1.0,"exworks":0.981,"freight":0.101,"landed":1.082}],"risk":"High","volShare":0.19},{"pn":"MAT36101","desc":"Grippy Mat Roll 36in x 150ft, Gray","service":"Mat Roll","tack":"High","width":36,"weight":8,"volume":7133,"np":[{"name":"Needlepunch C","alloc":1.0,"exworks":1.805,"freight":0.273,"landed":2.077}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.744,"freight":0.168,"landed":0.912}],"risk":"High","volShare":0.21},{"pn":"GRPPT36200","desc":"Grippy Patch 36in x 60ft, Gray","service":"Textured (Patch)","tack":"High","width":36,"weight":11,"volume":1690,"np":[{"name":"Needlepunch B","alloc":1.0,"exworks":2.205,"freight":0.176,"landed":2.381},{"name":"Needlepunch C","alloc":0.0,"exworks":1.674,"freight":0.204,"landed":1.878,"inactive":true}],"lam":[{"name":"Laminator M","alloc":1.0,"exworks":0.759,"freight":0.107,"landed":0.867},{"name":"Laminator T","alloc":0.0,"exworks":0.735,"freight":0.142,"landed":0.877,"inactive":true}],"risk":"High","volShare":0.05},{"pn":"GRPPT36201","desc":"Grippy Patch 36in x 60ft, Brown","service":"Textured (Patch)","tack":"High","width":36,"weight":11,"volume":1535,"np":[{"name":"Needlepunch B","alloc":0.66,"exworks":2.33,"freight":0.191,"landed":2.521},{"name":"Needlepunch A","alloc":0.34,"exworks":2.018,"freight":0.139,"landed":2.156}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.807,"freight":0.248,"landed":1.055}],"risk":"Medium","volShare":0.05},{"pn":"GRPBB36203","desc":"Grippy Berber 36in x 60ft, Black","service":"Textured (Berber)","tack":"High","width":36,"weight":11,"volume":1604,"np":[{"name":"Needlepunch C","alloc":1.0,"exworks":1.615,"freight":0.281,"landed":1.896},{"name":"Needlepunch B","alloc":0.0,"exworks":2.12,"freight":0.189,"landed":2.309,"inactive":true}],"lam":[{"name":"Laminator M","alloc":1.0,"exworks":0.951,"freight":0.135,"landed":1.086},{"name":"Laminator F","alloc":0.0,"exworks":0.562,"freight":0.282,"landed":0.844,"inactive":true}],"risk":"High","volShare":0.05},{"pn":"GRPFR36200","desc":"Grippy Flame-Resistant 36in x 100ft, Gray","service":"Flame-Resistant","tack":"High","width":36,"weight":8,"volume":1120,"np":[{"name":"Needlepunch C","alloc":1.0,"exworks":1.808,"freight":0.192,"landed":2.0},{"name":"Needlepunch A","alloc":0.0,"exworks":1.388,"freight":0.157,"landed":1.545,"inactive":true}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.636,"freight":0.232,"landed":0.868}],"risk":"High","volShare":0.03},{"pn":"GRPPE36200","desc":"Grippy PET 36in x 60ft, Mocha","service":"PET Grippy","tack":"High","width":36,"weight":8,"volume":902,"np":[{"name":"Needlepunch A","alloc":0.74,"exworks":1.586,"freight":0.145,"landed":1.731},{"name":"Needlepunch C","alloc":0.26,"exworks":1.446,"freight":0.249,"landed":1.695}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.628,"freight":0.259,"landed":0.886},{"name":"Laminator T","alloc":0.0,"exworks":0.791,"freight":0.168,"landed":0.959,"inactive":true}],"risk":"Medium","volShare":0.03},{"pn":"GRPBB36201","desc":"Grippy Berber 36in x 60ft, Brown","service":"Textured (Berber)","tack":"High","width":36,"weight":11,"volume":824,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":1.639,"freight":0.135,"landed":1.773}],"lam":[{"name":"Laminator F","alloc":0.71,"exworks":0.713,"freight":0.281,"landed":0.994},{"name":"Laminator T","alloc":0.29,"exworks":0.973,"freight":0.142,"landed":1.115}],"risk":"Medium","volShare":0.02},{"pn":"GRPBB36202","desc":"Grippy Berber 36in x 60ft, Burgundy","service":"Textured (Berber)","tack":"High","width":36,"weight":11,"volume":737,"np":[{"name":"Needlepunch C","alloc":1.0,"exworks":1.629,"freight":0.215,"landed":1.844}],"lam":[{"name":"Laminator T","alloc":0.65,"exworks":1.008,"freight":0.143,"landed":1.151},{"name":"Laminator M","alloc":0.35,"exworks":0.777,"freight":0.128,"landed":0.905}],"risk":"Medium","volShare":0.02},{"pn":"GRPSB36200","desc":"Grippy Safety Border 36in x 60ft, Yellow/Black","service":"Safety Border","tack":"High","width":36,"weight":11,"volume":700,"np":[{"name":"Needlepunch A","alloc":1.0,"exworks":1.898,"freight":0.131,"landed":2.029}],"lam":[{"name":"Laminator F","alloc":1.0,"exworks":0.651,"freight":0.259,"landed":0.91},{"name":"Laminator T","alloc":0.0,"exworks":0.932,"freight":0.146,"landed":1.078,"inactive":true}],"risk":"High","volShare":0.02}];

const C = {
  bg: "#13161B", panel: "#1B1F27", panel2: "#222732", line: "#2C333F",
  text: "#E7EBF0", muted: "#8B95A3", faint: "#5A6472",
  brand: "#FFC20E", exworks: "#3C5A78", freight: "#6F7E92", save: "#42b883",
};
const RISK = { Critical: "#C5413B", High: "#D9772E", Medium: "#C7A23B", Low: "#3C7A5A" };
const RISK_ORDER = ["Critical", "High", "Medium", "Low"];

const STAGES = {
  np:  { label: "Needlepunch", sub: "fabric stage", pool: ["Needlepunch A", "Needlepunch B", "Needlepunch C"], Icon: Scissors },
  lam: { label: "Lamination", sub: "backing stage", pool: ["Laminator M", "Laminator T", "Laminator F"], Icon: Factory },
};

const fmt = (n) => Math.round(n).toLocaleString("en-US");
const usd0 = (n) => "$" + Math.round(n).toLocaleString("en-US");
const usdK = (n) => (Math.abs(n) >= 1000 ? "$" + (n / 1000).toFixed(0) + "k" : "$" + n.toFixed(0));
const money = (n) => "$" + n.toFixed(3);
const pct = (n, d = 1) => n.toFixed(d) + "%";

const act = (arr) => arr.filter((s) => s.alloc > 0);
const wlanded = (arr) => act(arr).reduce((a, s) => a + s.alloc * s.landed, 0);
const wfreight = (arr) => act(arr).reduce((a, s) => a + s.alloc * s.freight, 0);
const bestOf = (arr) => Math.min(...arr.map((s) => s.landed));
const bestSupOf = (arr) => arr.reduce((b, s) => (s.landed < b.landed ? s : b), arr[0]).name;

const DERIVED = {};
PARTS.forEach((p) => {
  const npL = wlanded(p.np), lamL = wlanded(p.lam);
  const current = npL + lamL;
  const npB = bestOf(p.np), lamB = bestOf(p.lam);
  const best = npB + lamB;
  const gap = Math.max(0, current - best);
  DERIVED[p.pn] = {
    npL, lamL, current,
    npFreight: wfreight(p.np), lamFreight: wfreight(p.lam),
    freightUnit: wfreight(p.np) + wfreight(p.lam),
    npB, lamB, best, npBestSup: bestSupOf(p.np), lamBestSup: bestSupOf(p.lam),
    gap, gapPct: current > 0 ? gap / current : 0,
    savings: gap * p.volume, spend: current * p.volume,
    npSingle: act(p.np).length === 1, lamSingle: act(p.lam).length === 1,
  };
});
const BY_PN = Object.fromEntries(PARTS.map((p) => [p.pn, p]));
const D = (p) => DERIVED[p.pn];

const sortedLanded = PARTS.map((p) => D(p).current).sort((a, b) => a - b);
const qv = (f) => sortedLanded[Math.floor(f * (sortedLanded.length - 1))];
const LANDED_BANDS = [qv(0.25), qv(0.5), qv(0.75)];
const savingsColor = (g) => (g <= 0.0005 ? "#39424f" : g < 0.03 ? "#2f6b4f" : g < 0.08 ? "#359268" : "#42b883");
const landedColor = (v) => { const [a, b, c] = LANDED_BANDS; return v < a ? "#2f7a6b" : v < b ? "#C7A23B" : v < c ? "#D9772E" : "#C5413B"; };

function stageRollup(stageKey) {
  return STAGES[stageKey].pool.map((name) => {
    const served = PARTS.map((p) => {
      const s = p[stageKey].find((x) => x.name === name && x.alloc > 0);
      return s ? { p, s, vol: p.volume * s.alloc } : null;
    }).filter(Boolean);
    const vol = served.reduce((a, x) => a + x.vol, 0);
    const spend = served.reduce((a, x) => a + x.vol * x.s.landed, 0);
    const freight = served.reduce((a, x) => a + x.vol * x.s.freight, 0);
    return { name, partCount: served.length, vol, spend,
      avgLanded: vol ? spend / vol : 0, avgFreight: vol ? freight / vol : 0,
      avgEx: vol ? (spend - freight) / vol : 0 };
  }).filter((r) => r.vol > 0).sort((a, b) => b.vol - a.vol);
}

export default function App() {
  const [view, setView] = useState("overview");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [sortKey, setSortKey] = useState("spend");
  const [sortDir, setSortDir] = useState(-1);
  const [sizeMode, setSizeMode] = useState("spend");
  const [colorMode, setColorMode] = useState("savings");
  const [ovStage, setOvStage] = useState("lam");

  const m = useMemo(() => {
    const totalVol = PARTS.reduce((a, p) => a + p.volume, 0);
    const totalSpend = PARTS.reduce((a, p) => a + D(p).spend, 0);
    const npSpend = PARTS.reduce((a, p) => a + D(p).npL * p.volume, 0);
    const lamSpend = PARTS.reduce((a, p) => a + D(p).lamL * p.volume, 0);
    const totalFreight = PARTS.reduce((a, p) => a + D(p).freightUnit * p.volume, 0);
    const totalSavings = PARTS.reduce((a, p) => a + D(p).savings, 0);
    const blended = totalSpend / totalVol;
    const partsWithAlt = PARTS.filter((p) => D(p).savings > 0.5);
    const svc = {};
    PARTS.forEach((p) => { svc[p.service] = (svc[p.service] || 0) + D(p).spend; });
    const serviceData = Object.entries(svc).map(([name, spend]) => ({ name, spend })).sort((a, b) => b.spend - a.spend);
    return { totalVol, totalSpend, npSpend, lamSpend, totalFreight, totalSavings, blended, partsWithAlt, serviceData };
  }, []);

  const rollups = useMemo(() => ({ np: stageRollup("np"), lam: stageRollup("lam") }), []);
  const gapTable = useMemo(() => PARTS.filter((p) => D(p).savings > 0.5).sort((a, b) => D(b).savings - D(a).savings), []);
  const treemapData = useMemo(() => PARTS.map((p) => ({ name: p.pn, spend: D(p).spend, volume: p.volume })), []);

  const listParts = useMemo(() => {
    let r = PARTS.filter((p) => {
      const qy = search.trim().toLowerCase();
      const okQ = !qy || p.pn.toLowerCase().includes(qy) || p.desc.toLowerCase().includes(qy);
      return okQ && (riskFilter === "All" || p.risk === riskFilter);
    });
    const key = (p) => sortKey === "spend" ? D(p).spend : sortKey === "savings" ? D(p).savings
      : sortKey === "landed" ? D(p).current : sortKey === "npL" ? D(p).npL : sortKey === "lamL" ? D(p).lamL : p[sortKey];
    return [...r].sort((a, b) => {
      const av = key(a), bv = key(b);
      return typeof av === "string" ? sortDir * av.localeCompare(bv) : sortDir * (av - bv);
    });
  }, [search, riskFilter, sortKey, sortDir]);

  const setSort = (k) => { if (sortKey === k) setSortDir((d) => -d); else { setSortKey(k); setSortDir(-1); } };

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100%", fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "20px 22px 64px" }}>
        <Header />
        <Tabs view={view} setView={setView} />

        {view === "overview" && (
          <>
            <KpiRow m={m} setView={setView} />
            <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
              <Panel title="Spend & volume map"
                sub="Tile area and color switchable — find where the money and the savings concentrate"
                right={<TreeControls {...{ sizeMode, setSizeMode, colorMode, setColorMode }} />}>
                <Legend mode={colorMode} />
                <div style={{ height: 420, marginTop: 4 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap data={treemapData} dataKey={sizeMode} stroke={C.bg} isAnimationActive={false}
                      content={<TreeCell onPick={setSelected} colorMode={colorMode} />}>
                      <Tooltip content={<TreeTip />} />
                    </Treemap>
                  </ResponsiveContainer>
                </div>
              </Panel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Panel title="Landed spend by service" sub="Where throughput and dollars sit">
                  <ServiceChart data={m.serviceData} />
                </Panel>
                <Panel title="Landed cost by supplier" sub="Ex-works + freight = landed · two process stages"
                  right={<Seg value={ovStage} set={setOvStage} options={[["lam", "Lamination"], ["np", "Needlepunch"]]} />}>
                  <SupplierLandedBars rollup={rollups[ovStage]} onOpen={() => setView("pricing")} />
                </Panel>
              </div>
            </div>
          </>
        )}

        {view === "pricing" && <PricingView rollups={rollups} gapTable={gapTable} totalSavings={m.totalSavings} onPick={setSelected} />}
        {view === "suppliers" && <SupplierView rollups={rollups} total={m.totalVol} onPickPart={setSelected} />}
        {view === "list" && <ListView parts={listParts} {...{ search, setSearch, riskFilter, setRiskFilter, sortKey, sortDir, setSort }} onPick={setSelected} />}
      </div>
      {selected && <DrillPanel part={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Header() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
      <div>
        <div style={{ fontSize: 11, letterSpacing: 2, color: C.brand, fontWeight: 600, textTransform: "uppercase" }}>New Pig · Grippy</div>
        <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: -0.3, marginTop: 3 }}>Pricing &amp; Volume Dashboard</div>
      </div>
      <div style={{ textAlign: "right", fontSize: 11, color: C.faint, maxWidth: 250, lineHeight: 1.4, paddingTop: 4 }}>
        <span style={{ color: C.muted, fontWeight: 600 }}>Demo · simulated data.</span> SKUs follow the Grippy catalog;
        suppliers are anonymized and all pricing, volume &amp; freight are placeholder values.
      </div>
    </div>
  );
}

function Tabs({ view, setView }) {
  const tabs = [["overview", "Overview", Layers], ["pricing", "Pricing & savings", TrendingDown], ["suppliers", "By supplier", Factory], ["list", "Part list", Boxes]];
  return (
    <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${C.line}`, marginBottom: 16 }}>
      {tabs.map(([k, label, Icon]) => {
        const on = view === k;
        return (
          <button key={k} onClick={() => setView(k)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 14px", background: "transparent", border: "none", cursor: "pointer", color: on ? C.text : C.muted, fontWeight: on ? 600 : 500, fontSize: 13.5, borderBottom: on ? `2px solid ${C.brand}` : "2px solid transparent", marginBottom: -1 }}>
            <Icon size={15} /> {label}
          </button>
        );
      })}
    </div>
  );
}

function KpiRow({ m, setView }) {
  const npShare = (m.npSpend / m.totalSpend) * 100;
  const freightPct = (m.totalFreight / m.totalSpend) * 100;
  const cards = [
    { label: "Annual line volume", value: fmt(m.totalVol), unit: "units", sub: `${PARTS.length} active SKUs`, tone: C.text },
    { label: "Total landed spend", value: usdK(m.totalSpend), sub: "fabric + backing, incl. freight", tone: C.text, emphasis: true },
    { label: "Blended landed cost", value: money(m.blended), unit: "/unit", sub: "volume-weighted", tone: C.text },
    { label: "Addressable savings", value: usdK(m.totalSavings), sub: `${m.partsWithAlt.length} SKUs have a cheaper qualified source`, tone: C.save, emphasis: true, onClick: () => setView("pricing") },
    { label: "Needlepunch share", value: pct(npShare, 0), sub: `lamination ${pct(100 - npShare, 0)} of spend`, tone: "#9DB0C6" },
    { label: "Freight burden", value: pct(freightPct), sub: `${usdK(m.totalFreight)} of landed spend`, tone: "#9DB0C6" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
      {cards.map((c) => (
        <div key={c.label} onClick={c.onClick} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: "12px 13px", cursor: c.onClick ? "pointer" : "default", borderLeft: c.emphasis ? `3px solid ${c.tone === C.save ? C.save : C.brand}` : `1px solid ${C.line}` }}>
          <div style={{ fontSize: 10.5, color: C.muted, textTransform: "uppercase", letterSpacing: 0.6, lineHeight: 1.3, minHeight: 26 }}>{c.label}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 7 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: c.tone, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{c.value}</span>
            {c.unit && <span style={{ fontSize: 11, color: C.faint }}>{c.unit}</span>}
          </div>
          <div style={{ fontSize: 10.5, color: C.faint, marginTop: 4, lineHeight: 1.3 }}>{c.sub}</div>
        </div>
      ))}
    </div>
  );
}

function Panel({ title, sub, right, children }) {
  return (
    <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 2 }}>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 600 }}>{title}</div>
          {sub && <div style={{ fontSize: 11.5, color: C.muted, marginTop: 2 }}>{sub}</div>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function Seg({ value, set, options }) {
  return (
    <div style={{ display: "inline-flex", background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 7, padding: 2 }}>
      {options.map(([v, label]) => {
        const on = value === v;
        return <button key={v} onClick={() => set(v)} style={{ padding: "4px 9px", fontSize: 11.5, border: "none", borderRadius: 5, cursor: "pointer", background: on ? C.brand : "transparent", color: on ? "#1a1206" : C.muted, fontWeight: on ? 700 : 500 }}>{label}</button>;
      })}
    </div>
  );
}

function TreeControls({ sizeMode, setSizeMode, colorMode, setColorMode }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ fontSize: 10.5, color: C.faint, textTransform: "uppercase", letterSpacing: 0.5 }}>Size</span><Seg value={sizeMode} set={setSizeMode} options={[["spend", "Spend"], ["volume", "Volume"]]} /></div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ fontSize: 10.5, color: C.faint, textTransform: "uppercase", letterSpacing: 0.5 }}>Color</span><Seg value={colorMode} set={setColorMode} options={[["savings", "Savings"], ["landed", "Landed $"], ["risk", "Risk"]]} /></div>
    </div>
  );
}

function Legend({ mode }) {
  let items;
  if (mode === "savings") items = [["#39424f", "no cheaper alt"], ["#2f6b4f", "<3%"], ["#359268", "3–8%"], ["#42b883", ">8% savings/unit"]];
  else if (mode === "landed") { const b = LANDED_BANDS; items = [["#2f7a6b", `<${money(b[0])}`], ["#C7A23B", `${money(b[0])}–${money(b[1])}`], ["#D9772E", `${money(b[1])}–${money(b[2])}`], ["#C5413B", `>${money(b[2])}`]]; }
  else items = RISK_ORDER.map((r) => [RISK[r], r]);
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginTop: 8 }}>
      {items.map(([col, label]) => <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: col }} /><span style={{ fontSize: 11, color: C.muted }}>{label}</span></div>)}
    </div>
  );
}

function TreeCell(props) {
  const { x, y, width, height, depth, onPick, colorMode } = props;
  if (depth !== 1 || width <= 0 || height <= 0) return null;
  const p = BY_PN[props.name]; if (!p) return null;
  const d = D(p);
  const fill = colorMode === "savings" ? savingsColor(d.gapPct) : colorMode === "landed" ? landedColor(d.current) : RISK[p.risk];
  const showText = width > 50 && height > 26, showSub = width > 80 && height > 44;
  const sub = colorMode === "landed" ? money(d.current) : colorMode === "risk" ? p.risk : (d.savings > 0.5 ? usdK(d.savings) + " save" : fmt(p.volume) + " u");
  return (
    <g style={{ cursor: "pointer" }} onClick={() => onPick(p)}>
      <rect x={x} y={y} width={width} height={height} fill={fill} stroke={C.bg} strokeWidth={1.5} rx={2} opacity={0.92} />
      {(d.npSingle || d.lamSingle) && width > 30 && height > 20 && <rect x={x + 4} y={y + 4} width={5} height={5} rx={1} fill="#0c0e12" opacity={0.5} />}
      {showText && <text x={x + 7} y={y + 16} fill="#0d0f13" fontSize={10.5} fontWeight={700} fontFamily="ui-monospace, Menlo, monospace">{props.name}</text>}
      {showSub && <text x={x + 7} y={y + 30} fill="#13161b" fontSize={9.5} opacity={0.8}>{sub}</text>}
    </g>
  );
}

function TreeTip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const p = BY_PN[payload[0].payload && payload[0].payload.name]; if (!p) return null;
  const d = D(p);
  return (
    <div style={{ background: "#0d0f13", border: `1px solid ${C.line}`, borderRadius: 8, padding: "10px 12px", maxWidth: 280 }}>
      <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontWeight: 700, fontSize: 13 }}>{p.pn}</div>
      <div style={{ fontSize: 11, color: C.muted, marginTop: 4, lineHeight: 1.35 }}>{p.desc}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px 14px", marginTop: 8, fontSize: 11 }}>
        <span style={{ color: C.faint }}>Volume <b style={{ color: C.text }}>{fmt(p.volume)}</b></span>
        <span style={{ color: C.faint }}>Landed <b style={{ color: C.text }}>{money(d.current)}</b></span>
        <span style={{ color: C.faint }}>Spend <b style={{ color: C.text }}>{usdK(d.spend)}</b></span>
        <span style={{ color: C.faint }}>Save <b style={{ color: d.savings > 0.5 ? C.save : C.text }}>{d.savings > 0.5 ? usdK(d.savings) : "—"}</b></span>
      </div>
    </div>
  );
}

function ServiceChart({ data }) {
  return (
    <div style={{ height: 270, marginTop: 8 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 40, top: 0, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" width={150} tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Bar dataKey="spend" radius={[0, 3, 3, 0]} maxBarSize={16}>
            {data.map((d, i) => <Cell key={i} fill={i === 0 ? C.brand : "#42505F"} />)}
            <LabelList dataKey="spend" position="right" formatter={(v) => usdK(v)} style={{ fill: C.muted, fontSize: 10.5 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function SupplierLandedBars({ rollup, onOpen }) {
  const max = Math.max(...rollup.map((r) => r.avgLanded));
  const cheapest = Math.min(...rollup.map((r) => r.avgLanded));
  return (
    <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 13, cursor: onOpen ? "pointer" : "default" }} onClick={onOpen}>
      {rollup.map((r) => {
        const exW = (r.avgEx / max) * 100, frW = (r.avgFreight / max) * 100, gap = r.avgLanded - cheapest;
        return (
          <div key={r.name}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
              <span>{r.name}</span>
              <span style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>{money(r.avgLanded)}{gap > 0.001 ? <span style={{ color: RISK.High, fontSize: 11 }}> · +{money(gap)}</span> : <span style={{ color: C.save, fontSize: 11 }}> · low</span>}</span>
            </div>
            <div style={{ height: 14, background: C.panel2, borderRadius: 4, overflow: "hidden", display: "flex" }}>
              <div style={{ width: `${exW}%`, height: "100%", background: C.exworks }} />
              <div style={{ width: `${frW}%`, height: "100%", background: C.freight }} />
            </div>
            <div style={{ fontSize: 10, color: C.faint, marginTop: 3 }}>{r.partCount} SKUs · ex-works {money(r.avgEx)} + freight {money(r.avgFreight)}</div>
          </div>
        );
      })}
      <div style={{ display: "flex", gap: 14, marginTop: 2 }}>
        <LegendDot c={C.exworks} label="ex-works" /><LegendDot c={C.freight} label="freight" />
      </div>
    </div>
  );
}
function LegendDot({ c, label }) { return <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10.5, color: C.muted }}><span style={{ width: 9, height: 9, borderRadius: 2, background: c }} />{label}</span>; }

function PricingView({ rollups, gapTable, totalSavings, onPick }) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {["lam", "np"].map((k) => {
          const { label, sub, Icon } = STAGES[k];
          return (
            <Panel key={k} title={<span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Icon size={15} color={C.muted} />{label} suppliers</span>} sub={`${sub} · volume-weighted average landed cost`}>
              <SupplierLandedBars rollup={rollups[k]} />
            </Panel>
          );
        })}
      </div>
      <Panel title="Price-gap opportunities" sub={`${gapTable.length} SKUs where a qualified supplier quotes a lower landed cost · ${usd0(totalSavings)} addressable per year`}>
        <div style={{ marginTop: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "96px 1fr 80px 132px 132px 70px 92px", gap: 8, padding: "0 8px 8px", fontSize: 10.5, color: C.faint, textTransform: "uppercase", letterSpacing: 0.5, borderBottom: `1px solid ${C.line}` }}>
            <span>SKU</span><span>Description</span><span style={{ textAlign: "right" }}>Volume</span><span>Current landed</span><span>Best achievable</span><span style={{ textAlign: "right" }}>Δ/unit</span><span style={{ textAlign: "right" }}>Annual save</span>
          </div>
          {gapTable.map((p) => {
            const d = D(p);
            return (
              <div key={p.pn} onClick={() => onPick(p)} style={{ display: "grid", gridTemplateColumns: "96px 1fr 80px 132px 132px 70px 92px", gap: 8, padding: "9px 8px", alignItems: "center", cursor: "pointer", borderBottom: `1px solid ${C.panel2}`, fontSize: 12 }} onMouseEnter={(e) => (e.currentTarget.style.background = C.panel2)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontWeight: 600 }}>{p.pn}</span>
                <span style={{ color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.desc}</span>
                <span style={{ textAlign: "right", fontFamily: "ui-monospace, Menlo, monospace" }}>{fmt(p.volume)}</span>
                <span style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>{money(d.current)} <span style={{ color: C.faint, fontSize: 10.5 }}>NP {money(d.npL)}+L {money(d.lamL)}</span></span>
                <span style={{ color: C.save, fontFamily: "ui-monospace, Menlo, monospace" }}>{money(d.best)} <span style={{ fontSize: 10.5, opacity: 0.8 }}>{money(d.npB)}+{money(d.lamB)}</span></span>
                <span style={{ textAlign: "right", fontFamily: "ui-monospace, Menlo, monospace", color: RISK.High }}>{money(d.gap)}</span>
                <span style={{ textAlign: "right", fontFamily: "ui-monospace, Menlo, monospace", color: C.save, fontWeight: 700 }}>{usdK(d.savings)}</span>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

function SupplierView({ rollups, total, onPickPart }) {
  const [open, setOpen] = useState("Laminator M");
  const stageKey = STAGES.np.pool.includes(open) ? "np" : "lam";
  const parts = PARTS.filter((p) => p[stageKey].some((s) => s.name === open && s.alloc > 0)).sort((a, b) => D(b).spend - D(a).spend);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {["lam", "np"].map((k) => {
          const { label, sub, Icon } = STAGES[k];
          return (
            <div key={k}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: C.faint, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>
                <Icon size={13} /> {label} <span style={{ textTransform: "none", letterSpacing: 0 }}>· {sub}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {rollups[k].map((r) => {
                  const on = r.name === open;
                  return (
                    <div key={r.name} onClick={() => setOpen(r.name)} style={{ background: C.panel, border: `1px solid ${on ? C.brand : C.line}`, borderRadius: 9, padding: 13, cursor: "pointer" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 600 }}>{r.name}</span>
                        <span style={{ fontSize: 12, color: C.muted, fontFamily: "ui-monospace, Menlo, monospace" }}>{pct((r.vol / total) * 100)}</span>
                      </div>
                      <div style={{ display: "flex", gap: 16, marginTop: 9 }}>
                        <Stat label="SKUs" value={r.partCount} /><Stat label="Spend" value={usdK(r.spend)} /><Stat label="Avg landed" value={money(r.avgLanded)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Panel title={`${open} — parts`} sub={`Every SKU this ${STAGES[stageKey].label.toLowerCase()} supplier touches, by landed spend.`}>
        <div style={{ marginTop: 10 }}><PartRows parts={parts} onPick={onPickPart} /></div>
      </Panel>
    </div>
  );
}
function Stat({ label, value }) {
  return <div><div style={{ fontSize: 16, fontWeight: 700, color: C.text, fontFamily: "ui-monospace, Menlo, monospace" }}>{value}</div><div style={{ fontSize: 10, color: C.faint, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div></div>;
}

function ListView({ parts, search, setSearch, riskFilter, setRiskFilter, sortKey, sortDir, setSort, onPick }) {
  return (
    <Panel title="Part list" sub={`${parts.length} of ${PARTS.length} SKUs`} right={
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 7, padding: "5px 9px" }}>
          <Search size={13} color={C.faint} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="SKU or description" style={{ background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 12.5, width: 150 }} />
        </div>
        <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} style={{ background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 7, color: C.text, fontSize: 12.5, padding: "6px 8px" }}>
          {["All", ...RISK_ORDER].map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>}>
      <div style={{ marginTop: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "98px 1fr 78px 78px 82px 82px 80px", gap: 8, padding: "0 8px 8px", fontSize: 10.5, color: C.faint, textTransform: "uppercase", letterSpacing: 0.5, borderBottom: `1px solid ${C.line}` }}>
          <HCell label="SKU" k="pn" {...{ sortKey, sortDir, setSort }} />
          <span>Description</span>
          <HCell label="NP $/u" k="npL" {...{ sortKey, sortDir, setSort }} right />
          <HCell label="Lam $/u" k="lamL" {...{ sortKey, sortDir, setSort }} right />
          <HCell label="Landed" k="landed" {...{ sortKey, sortDir, setSort }} right />
          <HCell label="Spend" k="spend" {...{ sortKey, sortDir, setSort }} right />
          <HCell label="Save" k="savings" {...{ sortKey, sortDir, setSort }} right />
        </div>
        <PartRows parts={parts} onPick={onPick} dense />
      </div>
    </Panel>
  );
}
function HCell({ label, k, sortKey, sortDir, setSort, right }) {
  const on = sortKey === k;
  return <span onClick={() => setSort(k)} style={{ cursor: "pointer", display: "flex", gap: 3, alignItems: "center", justifyContent: right ? "flex-end" : "flex-start", color: on ? C.text : C.faint }}>{label} <ArrowUpDown size={11} /></span>;
}
function PartRows({ parts, onPick, dense }) {
  return (
    <div>
      {parts.map((p) => {
        const d = D(p);
        return (
          <div key={p.pn} onClick={() => onPick(p)} style={{ display: "grid", gridTemplateColumns: dense ? "98px 1fr 78px 78px 82px 82px 80px" : "104px 1fr 110px 96px 84px", gap: 8, padding: "9px 8px", alignItems: "center", cursor: "pointer", borderBottom: `1px solid ${C.panel2}`, fontSize: 12.5 }} onMouseEnter={(e) => (e.currentTarget.style.background = C.panel2)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontWeight: 600 }}>{p.pn}</span>
            <span style={{ color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.desc}</span>
            {dense ? <>
              <span style={{ textAlign: "right", fontFamily: "ui-monospace, Menlo, monospace", color: C.muted }}>{money(d.npL)}</span>
              <span style={{ textAlign: "right", fontFamily: "ui-monospace, Menlo, monospace", color: C.muted }}>{money(d.lamL)}</span>
              <span style={{ textAlign: "right", fontFamily: "ui-monospace, Menlo, monospace" }}>{money(d.current)}</span>
              <span style={{ textAlign: "right", fontFamily: "ui-monospace, Menlo, monospace" }}>{usdK(d.spend)}</span>
              <span style={{ textAlign: "right", fontFamily: "ui-monospace, Menlo, monospace", color: d.savings > 0.5 ? C.save : C.faint, fontWeight: d.savings > 0.5 ? 700 : 400 }}>{d.savings > 0.5 ? usdK(d.savings) : "—"}</span>
            </> : <>
              <span style={{ color: C.muted, fontSize: 11.5 }}>{p.service}</span>
              <span style={{ textAlign: "right", fontFamily: "ui-monospace, Menlo, monospace" }}>{usdK(d.spend)}</span>
              <span style={{ textAlign: "right" }}><RiskPill risk={p.risk} /></span>
            </>}
          </div>
        );
      })}
    </div>
  );
}
function RiskPill({ risk }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 7px", borderRadius: 20, background: RISK[risk] + "22", border: `1px solid ${RISK[risk]}66` }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: RISK[risk] }} /><span style={{ fontSize: 10.5, color: RISK[risk], fontWeight: 600 }}>{risk}</span></span>;
}

function DrillPanel({ part, onClose }) {
  const d = D(part);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 40 }} />
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 450, maxWidth: "94vw", background: C.panel, borderLeft: `1px solid ${C.line}`, zIndex: 50, overflowY: "auto", boxShadow: "-12px 0 40px rgba(0,0,0,0.5)" }}>
        <div style={{ padding: "18px 20px", borderBottom: `1px solid ${C.line}`, position: "sticky", top: 0, background: C.panel }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 20, fontWeight: 700 }}>{part.pn}</span>
                <RiskPill risk={part.risk} />
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 5, lineHeight: 1.4, maxWidth: 330 }}>{part.desc}</div>
            </div>
            <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: C.muted }}><X size={20} /></button>
          </div>
        </div>

        <div style={{ padding: 20 }}>
          {/* cost buildup */}
          <div style={{ background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: C.faint, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>Landed cost buildup</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <Build label="Needlepunch" value={money(d.npL)} />
              <Plus />
              <Build label="Lamination" value={money(d.lamL)} />
              <span style={{ color: C.faint, fontSize: 16 }}>=</span>
              <Build label="Total landed" value={money(d.current)} strong />
            </div>
            <div style={{ display: "flex", gap: 18, marginTop: 12 }}>
              <Mini label="Annual volume" value={fmt(part.volume) + " u"} />
              <Mini label="Annual spend" value={usd0(d.spend)} />
              <Mini label="Freight" value={money(d.freightUnit) + "/u"} />
            </div>
          </div>

          {d.savings > 0.5 && (
            <div style={{ display: "flex", gap: 9, padding: "12px 13px", borderRadius: 8, background: C.save + "18", border: `1px solid ${C.save}55`, marginBottom: 16 }}>
              <TrendingDown size={17} color={C.save} style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 12, lineHeight: 1.45 }}>
                Best qualified combo — <b>{d.npBestSup}</b> + <b>{d.lamBestSup}</b> at {money(d.best)} landed — saves <b style={{ color: C.save }}>{money(d.gap)}/unit</b>, about <b style={{ color: C.save }}>{usd0(d.savings)}/yr</b> at current volume.
              </div>
            </div>
          )}

          <Grid2>
            <Field label="Service" value={part.service} />
            <Field label="Tack" value={part.tack} />
            <Field label="Width" value={`${part.width}"`} />
            <Field label="Weight" value={`${part.weight} oz`} />
          </Grid2>

          <StageBlock part={part} stageKey="np" bestSup={d.npBestSup} />
          <StageBlock part={part} stageKey="lam" bestSup={d.lamBestSup} />

          <div style={{ fontSize: 10.5, color: C.faint, lineHeight: 1.5, marginTop: 14 }}>
            Two-stage build: needlepunch fabric then adhesive lamination. Landed = ex-works + inbound freight to New Pig (Tipton, PA). All figures simulated for the demo.
          </div>
        </div>
      </div>
    </>
  );
}
function StageBlock({ part, stageKey, bestSup }) {
  const { label, sub, Icon } = STAGES[stageKey];
  const rows = [...part[stageKey]].sort((a, b) => a.landed - b.landed);
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: C.faint, textTransform: "uppercase", letterSpacing: 0.6, margin: "22px 0 10px" }}>
        <Icon size={13} /> {label} <span style={{ textTransform: "none", letterSpacing: 0, color: C.faint }}>· {sub}</span>
      </div>
      {rows.map((s) => {
        const inactive = s.alloc === 0, isBest = s.name === bestSup, exW = (s.exworks / s.landed) * 100;
        return (
          <div key={s.name} style={{ background: C.panel2, border: `1px solid ${isBest ? C.save + "66" : C.line}`, borderRadius: 9, padding: 13, marginBottom: 9, opacity: inactive ? 0.82 : 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 13.5 }}>{s.name}</span>
                {isBest && <span style={{ fontSize: 9.5, color: C.save, border: `1px solid ${C.save}66`, borderRadius: 10, padding: "1px 6px" }}>LOWEST LANDED</span>}
              </div>
              <span style={{ fontSize: 13, fontFamily: "ui-monospace, Menlo, monospace", fontWeight: 700 }}>{money(s.landed)}</span>
            </div>
            <div style={{ height: 8, background: "#161a21", borderRadius: 4, overflow: "hidden", display: "flex", margin: "10px 0 8px" }}>
              <div style={{ width: `${exW}%`, background: C.exworks }} /><div style={{ width: `${100 - exW}%`, background: C.freight }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: C.faint }}>
              <span>ex-works {money(s.exworks)} · freight {money(s.freight)}</span>
              <span>{inactive ? "qualified · inactive" : pct(s.alloc * 100, 0) + " allocated"}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
function Build({ label, value, strong }) {
  return <div style={{ background: strong ? C.brand + "14" : "#161a21", border: `1px solid ${strong ? C.brand + "44" : C.line}`, borderRadius: 8, padding: "8px 11px", minWidth: 78 }}>
    <div style={{ fontSize: 9, color: C.faint, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
    <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "ui-monospace, Menlo, monospace", marginTop: 2, color: strong ? C.brand : C.text }}>{value}</div>
  </div>;
}
function Plus() { return <span style={{ color: C.faint, fontSize: 16 }}>+</span>; }
function Mini({ label, value }) {
  return <div><div style={{ fontSize: 13.5, fontWeight: 700, color: C.text, fontFamily: "ui-monospace, Menlo, monospace" }}>{value}</div><div style={{ fontSize: 9.5, color: C.faint, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 1 }}>{label}</div></div>;
}
function Grid2({ children }) { return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: C.line, border: `1px solid ${C.line}`, borderRadius: 9, overflow: "hidden" }}>{children}</div>; }
function Field({ label, value }) { return <div style={{ background: C.panel, padding: "11px 13px" }}><div style={{ fontSize: 10, color: C.faint, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div><div style={{ fontSize: 14, marginTop: 3, fontWeight: 500 }}>{value}</div></div>; }
