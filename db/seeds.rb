area = Area.create(name: "エリアから探す")

yamaguchi = area.children.create(name: "山口")
fukuoka = area.children.create(name: "福岡")

yamaguchi.children.create([{name: "山口・防府"},{name: "下関・角島"},{name: "萩・長門"},{name: "宇部・小野田"},{name: "周南"},{name: "岩国・柳井"}])
fukuoka.children.create([{name: "福岡市"},{name: "太宰府・宗像・糟屋郡"},{name: "北九州市"},{name: "北九州市周辺"},{name: "筑豊"},{name: "久留米・筑後"},{name: "糸島"}])