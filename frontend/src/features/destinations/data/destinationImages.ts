const unsplash = (query: string) =>
  `https://images.unsplash.com/photo-${query}?auto=format&fit=crop&w=1200&q=85`;

export const destinationImages: Record<string, string> = {
  // =========================
  // KATHMANDU VALLEY
  // =========================

  kathmandu:
    unsplash("1533130061792-64b345e4a833"),

  bhaktapur:
    unsplash("1605649487212-47bdab064df7"),

  patan:
    unsplash("1605649487212-47bdab064df7"),

  lalitpur:
    unsplash("1605649487212-47bdab064df7"),

  kirtipur:
    unsplash("1605649487212-47bdab064df7"),

  panauti:
    unsplash("1605649487212-47bdab064df7"),

  "panauti-old-town":
    unsplash("1605649487212-47bdab064df7"),

  nagarkot:
    unsplash("1544735716-392fe2489ffa"),

  dhulikhel:
    unsplash("1486911278844-a81c5267e227"),

  namobuddha:
    unsplash("1605649487212-47bdab064df7"),

  kakani:
    unsplash("1486911278844-a81c5267e227"),

  chisapani:
    unsplash("1441974231531-c6227db76b6e"),

  shivapuri:
    unsplash("1441974231531-c6227db76b6e"),

  godavari:
    unsplash("1441974231531-c6227db76b6e"),

  taudaha:
    unsplash("1500530855697-b586d89ba3ee"),

  pharping:
    unsplash("1605649487212-47bdab064df7"),

  dakshinkali:
    unsplash("1605649487212-47bdab064df7"),

  sankhu:
    unsplash("1605649487212-47bdab064df7"),

  khokana:
    unsplash("1605649487212-47bdab064df7"),

  bungamati:
    unsplash("1605649487212-47bdab064df7"),

  nuwakot:
    unsplash("1486911278844-a81c5267e227"),

  // =========================
  // POKHARA / GANDAKI
  // =========================

  pokhara:
    unsplash("1544735716-392fe2489ffa"),

  sarangkot:
    unsplash("1486911278844-a81c5267e227"),

  "world-peace-pagoda":
    unsplash("1605649487212-47bdab064df7"),

  "begnas-lake":
    unsplash("1500530855697-b586d89ba3ee"),

  "phew-lake":
    unsplash("1500530855697-b586d89ba3ee"),

  "kapuche-lake":
    unsplash("1500530855697-b586d89ba3ee"),

  "lekh-nath":
    unsplash("1500530855697-b586d89ba3ee"),

  bandipur:
    unsplash("1544735716-392fe2489ffa"),

  lamjung:
    unsplash("1486911278844-a81c5267e227"),

  "ghale-gaun":
    unsplash("1441974231531-c6227db76b6e"),

  sikles:
    unsplash("1441974231531-c6227db76b6e"),

  kushma:
    unsplash("1486911278844-a81c5267e227"),

  baglung:
    unsplash("1441974231531-c6227db76b6e"),

  tatopani:
    unsplash("1441974231531-c6227db76b6e"),

  // =========================
  // ANNAPURNA / MUSTANG
  // =========================

  annapurna:
    unsplash("1486911278844-a81c5267e227"),

  mustang:
    unsplash("1605649487212-47bdab064df7"),

  muktinath:
    unsplash("1486911278844-a81c5267e227"),

  marpha:
    unsplash("1486911278844-a81c5267e227"),

  "lo-manthang":
    unsplash("1486911278844-a81c5267e227"),

  jomsom:
    unsplash("1486911278844-a81c5267e227"),

  kagbeni:
    unsplash("1486911278844-a81c5267e227"),

  manang:
    unsplash("1486911278844-a81c5267e227"),

  "thorong-la":
    unsplash("1486911278844-a81c5267e227"),

  "poon-hill":
    unsplash("1486911278844-a81c5267e227"),

  abc:
    unsplash("1486911278844-a81c5267e227"),

  "mardi-himal":
    unsplash("1486911278844-a81c5267e227"),

  "tilicho-lake":
    unsplash("1500530855697-b586d89ba3ee"),

  // =========================
  // EVEREST / KHUMBU
  // =========================

  everest:
    unsplash("1486911278844-a81c5267e227"),

  sagarmatha:
    unsplash("1486911278844-a81c5267e227"),

  "sagarmatha-national-park":
    unsplash("1486911278844-a81c5267e227"),

  "gokyo-lakes":
    unsplash("1500530855697-b586d89ba3ee"),

  // =========================
  // LANGTANG / BAGMATI
  // =========================

  langtang:
    unsplash("1486911278844-a81c5267e227"),

  gosaikunda:
    unsplash("1500530855697-b586d89ba3ee"),

  "panch-pokhari":
    unsplash("1500530855697-b586d89ba3ee"),

  sindhupalchok:
    unsplash("1441974231531-c6227db76b6e"),

  dolakha:
    unsplash("1486911278844-a81c5267e227"),

  charikot:
    unsplash("1486911278844-a81c5267e227"),

  kalinchowk:
    unsplash("1486911278844-a81c5267e227"),

  daman:
    unsplash("1486911278844-a81c5267e227"),

  chitlang:
    unsplash("1441974231531-c6227db76b6e"),

  markhu:
    unsplash("1500530855697-b586d89ba3ee"),

  kulekhani:
    unsplash("1500530855697-b586d89ba3ee"),

  // =========================
  // CHITWAN / TERAI
  // =========================

  chitwan:
    unsplash("1549366021-9f761d450615"),

  "chitwan-national-park":
    unsplash("1549366021-9f761d450615"),

  bardia:
    unsplash("1549366021-9f761d450615"),

  "bardiya-national-park":
    unsplash("1549366021-9f761d450615"),

  "banke-national-park":
    unsplash("1441974231531-c6227db76b6e"),

  banke:
    unsplash("1441974231531-c6227db76b6e"),

  "parsa-national-park":
    unsplash("1441974231531-c6227db76b6e"),

  // =========================
  // LUMBINI / WESTERN NEPAL
  // =========================

  lumbini:
    unsplash("1605649487212-47bdab064df7"),

  tilaurakot:
    unsplash("1605649487212-47bdab064df7"),

  kapilvastu:
    unsplash("1605649487212-47bdab064df7"),

  palpa:
    unsplash("1533130061792-64b345e4a833"),

  tansen:
    unsplash("1533130061792-64b345e4a833"),

  "tansen-palpa":
    unsplash("1533130061792-64b345e4a833"),

  "tansen-bazaar":
    unsplash("1533130061792-64b345e4a833"),

  "tansen-old-town":
    unsplash("1533130061792-64b345e4a833"),

  ramgram:
    unsplash("1605649487212-47bdab064df7"),

  // =========================
  // KARNALI
  // =========================

  "rara-lake":
    unsplash("1500530855697-b586d89ba3ee"),

  rara:
    unsplash("1500530855697-b586d89ba3ee"),

  phoksundo:
    unsplash("1500530855697-b586d89ba3ee"),

  "shey-phoksundo-national-park":
    unsplash("1486911278844-a81c5267e227"),

  dolpo:
    unsplash("1486911278844-a81c5267e227"),

  jumla:
    unsplash("1486911278844-a81c5267e227"),

  simikot:
    unsplash("1486911278844-a81c5267e227"),

  khaptad:
    unsplash("1441974231531-c6227db76b6e"),

  badimalika:
    unsplash("1486911278844-a81c5267e227"),

  "api-base-camp":
    unsplash("1486911278844-a81c5267e227"),

  "dodhara-chandani":
    unsplash("1441974231531-c6227db76b6e"),

  // =========================
  // KOSHI / EASTERN NEPAL
  // =========================

  ilam:
    unsplash("1500530855697-b586d89ba3ee"),

  illam:
    unsplash("1500530855697-b586d89ba3ee"),

  kanchenjunga:
    unsplash("1486911278844-a81c5267e227"),

  pathibhara:
    unsplash("1486911278844-a81c5267e227"),

  makalu:
    unsplash("1486911278844-a81c5267e227"),

  halesi:
    unsplash("1605649487212-47bdab064df7"),

  dhankuta:
    unsplash("1441974231531-c6227db76b6e"),

  bhedetar:
    unsplash("1486911278844-a81c5267e227"),

  barahachhetra:
    unsplash("1605649487212-47bdab064df7"),

  dharan:
    unsplash("1605649487212-47bdab064df7"),

  biratnagar:
    unsplash("1605649487212-47bdab064df7"),

  mechinagar:
    unsplash("1441974231531-c6227db76b6e"),

  "koshi-tappu":
    unsplash("1549366021-9f761d450615"),

  // =========================
  // JANAKPUR / MADHESH
  // =========================

  janakpur:
    unsplash("1548013146-72479768bada"),

  // =========================
  // OTHER
  // =========================

  gorkha:
    unsplash("1533130061792-64b345e4a833"),
};