-- ============================================================
-- Loja Moda — Seed Data
-- 45 products: 15 apparel, 15 watches, 15 accessories
-- ============================================================

INSERT INTO products (slug, name, price, category, stock, images, description, details)
VALUES

-- ============================================================
-- APPAREL (15 products) — stock: 10
-- ============================================================

(
  'camisa-oxford-slim-fit',
  'Camisa Oxford Slim Fit',
  69.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80'],
  'Camisa em algodao Oxford 100% de alta qualidade. Construcao slim fit para uma silhueta moderna. Colarinho button-down com detalhe de costura contrastante.',
  '{"fabric": "100% Algodao Oxford", "fit": "slim", "gender": "masculine", "subcategory": "Camisas"}'::jsonb
),

(
  'camisa-linho-premium',
  'Camisa Linho Premium',
  89.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80', 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=800&q=80'],
  'Camisa em linho italiano 100%. Textura natural caracteristica do linho. Ideal para ocasioes casuais e semi-formais nos meses quentes.',
  '{"fabric": "100% Linho Italiano", "fit": "regular", "gender": "masculine", "subcategory": "Camisas"}'::jsonb
),

(
  'blusa-seda-feminina',
  'Blusa Seda Premium Feminina',
  119.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=800&q=80', 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80'],
  'Blusa em seda 100% com caimento fluido e suave. Gola V, mangas longas com punho com botao coberto. Acabamento costura francesa.',
  '{"fabric": "100% Seda Natural", "fit": "regular", "gender": "feminine", "subcategory": "Blusas"}'::jsonb
),

(
  'casaco-la-premium',
  'Casaco La Premium',
  249.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80', 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80'],
  'Casaco em la virgem italiana 80% com cashmere 20%. Forro em seda natural. Fecho YKK com cordao de couro genuino. Disponivel em M a XL.',
  '{"fabric": "La Virgem Italiana 80%, Cashmere 20%", "fit": "regular", "gender": "unisex", "subcategory": "Casacos"}'::jsonb
),

(
  'calcas-alfaiataria-slim',
  'Calcas de Alfaiataria Slim',
  129.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', 'https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=800&q=80'],
  'Calcas de alfaiataria em tecido de la e viscose 55/45. Corte slim com pincas frontais. Forro parcial para conforto. Cintura com fecho de gancho.',
  '{"fabric": "La 55%, Viscose 45%", "fit": "slim", "gender": "masculine", "subcategory": "Calcas"}'::jsonb
),

(
  'fato-completo-super-130',
  'Fato Completo Super 130',
  449.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=800&q=80', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80'],
  'Fato completo em la Super 130 Italian Wool. Corte slim europeu com lapela estreita. Forro em viscose de seda. Dois botoes, dois vincos traseiros. Inclui calcas com forro.',
  '{"fabric": "La Super 130 Italiana", "fit": "slim", "gender": "masculine", "subcategory": "Formalwear"}'::jsonb
),

(
  'camisola-cashmere-gola-alta',
  'Camisola Cashmere Gola Alta',
  179.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80'],
  'Camisola em cashmere grau A, 100% suave ao toque. Gola alta dupla, costura plana para conforto maximo. Ponto em ribana classica.',
  '{"fabric": "100% Cashmere Grau A", "fit": "regular", "gender": "unisex", "subcategory": "Camisolas"}'::jsonb
),

(
  'vestido-midi-crepe',
  'Vestido Midi em Crepe',
  159.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=800&q=80', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80'],
  'Vestido midi em crepe de poliester premium. Corte fluido A-line. Fecho lateral discreto. Ideal para ocasioes de gala ou jantares especiais.',
  '{"fabric": "Crepe de Poliester Premium", "fit": "regular", "gender": "feminine", "subcategory": "Vestidos"}'::jsonb
),

(
  'blazer-estruturado-masculino',
  'Blazer Estruturado Masculino',
  199.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', 'https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=800&q=80'],
  'Blazer em tecido misto la/poliester. Entretela termocolada estruturada. Lapela notch, dois botoes frontais, bolsos posticos no peito.',
  '{"fabric": "La 60%, Poliester 40%", "fit": "slim", "gender": "masculine", "subcategory": "Blazers"}'::jsonb
),

(
  'camisa-popeline-branca',
  'Camisa Popeline Branca Classica',
  79.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80', 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80'],
  'Camisa em popeline de algodao 100% com acabamento antirrugas. Colarinho classico italiano. Punhos simples com botao de madreperola.',
  '{"fabric": "100% Algodao Popeline", "fit": "regular", "gender": "masculine", "subcategory": "Camisas"}'::jsonb
),

(
  'trench-coat-classico',
  'Trench Coat Classico',
  299.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80', 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&q=80'],
  'Trench coat em gabardine de algodao com revestimento impermeavel. Cinto regulavel, drapeado de chuva nas costas, forro removivel em la.',
  '{"fabric": "Gabardine Algodao com Revestimento Impermeavel", "fit": "regular", "gender": "unisex", "subcategory": "Casacos"}'::jsonb
),

(
  'calcas-chino-slim',
  'Calcas Chino Slim Premium',
  89.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80'],
  'Calcas chino em sarja de algodao 98% com 2% elastano para conforto. Cinco bolsos, corte slim. Versateis do casual ao smart casual.',
  '{"fabric": "Algodao 98%, Elastano 2%", "fit": "slim", "gender": "masculine", "subcategory": "Calcas"}'::jsonb
),

(
  'vestido-cocktail-premium',
  'Vestido Cocktail Premium',
  219.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80', 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&q=80'],
  'Vestido de cocktail em jacquard de seda. Corte evase, decote em V frontal. Fecho invisivel lateral. Comprimento acima do joelho.',
  '{"fabric": "Jacquard Seda Premium", "fit": "regular", "gender": "feminine", "subcategory": "Vestidos"}'::jsonb
),

(
  'calcas-palazzo-femininas',
  'Calcas Palazzo Femininas',
  109.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=800&q=80', 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80'],
  'Calcas palazzo em viscose fluida. Cintura alta com elastico, pernas largas. Movimento elegante perfeito para looks formais e casuais.',
  '{"fabric": "100% Viscose", "fit": "relaxed", "gender": "feminine", "subcategory": "Calcas"}'::jsonb
),

(
  'cardigan-la-merino',
  'Cardigan La Merino Premium',
  139.90,
  'apparel',
  10,
  ARRAY['https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'],
  'Cardigan em la merino extra fine. Botoes de chifre genuino. Bolsos laterais com costura reforcada. Ideal para layering em looks autorais.',
  '{"fabric": "100% La Merino Extra Fine", "fit": "regular", "gender": "unisex", "subcategory": "Camisolas"}'::jsonb
),

-- ============================================================
-- WATCHES (15 products) — stock: 3
-- ============================================================

(
  'cronografo-automatico-steel',
  'Cronografo Automatico Steel',
  1290.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80', 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800&q=80', 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800&q=80'],
  'Cronografo automatico em aco inoxidavel 316L. Mostrador preto sunray dial com indices dourados aplicados. Pulseira em couro genuino preto.',
  '{"movement": "Automatico Swiss Made — ETA 7750", "caseMaterial": "Aco Inoxidavel 316L polido e escovado", "caseDiameter": "42mm", "waterResistance": "100m / 10 ATM", "dialColor": "Preto Sunray", "strapMaterial": "Couro Genuino Preto", "crystalType": "Safira Anti-reflexo", "powerReserve": "48 horas", "reference": "LM-CHR-001"}'::jsonb
),

(
  'relogio-dress-ouro-mostrador-azul',
  'Dress Watch Ouro — Mostrador Azul',
  2490.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80', 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80', 'https://images.unsplash.com/photo-1639395372020-0e39c33e55df?w=800&q=80'],
  'Dress watch de alto luxo com caixa em aco dourado PVD 5 microns. Mostrador azul marinho gradiente com indices dourados em ouro real aplicados.',
  '{"movement": "Automatico Swiss Made — ETA 2824-2", "caseMaterial": "Aco Inoxidavel 316L com PVD Dourado 5 microns", "caseDiameter": "40mm", "waterResistance": "50m / 5 ATM", "dialColor": "Azul Marinho Gradiente", "strapMaterial": "Couro Alligator Azul", "crystalType": "Safira Anti-reflexo dupla face", "powerReserve": "38 horas", "reference": "LM-DRS-002"}'::jsonb
),

(
  'submarino-automatico-300m',
  'Submarino Automatico 300m',
  1890.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=800&q=80', 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&q=80'],
  'Relogio de mergulho profissional com impermeabilidade ate 300m. Luneta unidirecional em ceramica preta. Mostrador verde militar com indicadores de leitura noturna Super-LumiNova.',
  '{"movement": "Automatico Swiss Made — ETA 2836-2", "caseMaterial": "Aco Inoxidavel 316L escovado", "caseDiameter": "44mm", "waterResistance": "300m / 30 ATM", "dialColor": "Verde Militar", "strapMaterial": "Borracha Vulcanizada Negra / Bracelet Oyster", "crystalType": "Safira Anti-reflexo espessura dupla", "powerReserve": "42 horas", "reference": "LM-SUB-003"}'::jsonb
),

(
  'pilot-watch-classic',
  'Pilot Watch Classic',
  890.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=80', 'https://images.unsplash.com/photo-1548690596-f1722c190938?w=800&q=80'],
  'Relogio de aviacao inspirado na era dourada da aviacao comercial. Mostrador preto com numeracao arabe de alta legibilidade. Ponteiros Super-LumiNova em forma de espada.',
  '{"movement": "Quartzo Japones — Miyota 9015", "caseMaterial": "Aco Inoxidavel 316L", "caseDiameter": "40mm", "waterResistance": "50m / 5 ATM", "dialColor": "Preto Mate", "strapMaterial": "Couro de Aviao Marrom Envelhecido", "crystalType": "Safira", "reference": "LM-PIL-004"}'::jsonb
),

(
  'relogio-feminino-rose-gold',
  'Relogio Feminino Rose Gold',
  790.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1641206988022-bd9a6f5e31b3?w=800&q=80', 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80'],
  'Relogio feminino em aco com acabamento rose gold PVD. Mostrador branco nacarado com diamantes cravados nos indices. Bracelete em tres elos polidos.',
  '{"movement": "Quartzo Suico — ETA 955.112", "caseMaterial": "Aco Inoxidavel com PVD Rose Gold", "caseDiameter": "34mm", "waterResistance": "30m / 3 ATM", "dialColor": "Branco Nacarado", "strapMaterial": "Bracelete Tres Elos Rose Gold", "crystalType": "Safira", "reference": "LM-FEM-005"}'::jsonb
),

(
  'skeleton-automatico-luxury',
  'Skeleton Automatico Luxury',
  3890.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1615537182514-ee64048c60e4?w=800&q=80', 'https://images.unsplash.com/photo-1559562898-7f9037d9b3f9?w=800&q=80'],
  'Relogio skeleton de alta relojoaria com movimento automatico totalmente decorado. Ponte esqueleto trabalhada a mao com acabamento cotes de Geneve. Caixa em aco polido.',
  '{"movement": "Automatico Manual — ETA 6498 Esqueleto", "caseMaterial": "Aco Inoxidavel 316L polido", "caseDiameter": "45mm", "waterResistance": "30m / 3 ATM", "dialColor": "Esqueleto — Transparente", "strapMaterial": "Couro de Crocodilo Preto", "crystalType": "Safira Concava Anti-reflexo", "powerReserve": "65 horas", "reference": "LM-SKL-006"}'::jsonb
),

(
  'titanio-sport-automatico',
  'Titanio Sport Automatico',
  1490.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800&q=80', 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80'],
  'Relogio de sport em titanio grau 5. Ultraleve (apenas 78g com bracelete). Mostrador azul cobalto com indicador de reserva de marcha a 6h.',
  '{"movement": "Automatico Swiss Made — ETA 2892-A2", "caseMaterial": "Titanio Grau 5 (Ti-6Al-4V)", "caseDiameter": "43mm", "waterResistance": "200m / 20 ATM", "dialColor": "Azul Cobalto", "strapMaterial": "Bracelete Titanio / Pulseira Borracha", "crystalType": "Safira Anti-reflexo", "powerReserve": "42 horas", "reference": "LM-TIT-007"}'::jsonb
),

(
  'moonphase-romantico',
  'Moonphase Romantico',
  2890.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1639395372020-0e39c33e55df?w=800&q=80', 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80'],
  'Relogio com fase da lua pintada a mao em esmalte grand feu. Mostrador guilloche soleil. Indices em ouro macico 18k aplicados.',
  '{"movement": "Automatico Swiss Made com Moonphase — ETA 2832-2", "caseMaterial": "Aco Inoxidavel 316L", "caseDiameter": "38mm", "waterResistance": "30m / 3 ATM", "dialColor": "Prata Guilloche com Moonphase", "strapMaterial": "Couro de Lagarto Azul-Marinho", "crystalType": "Safira Anti-reflexo", "powerReserve": "38 horas", "reference": "LM-MNP-008"}'::jsonb
),

(
  'relogio-solar-slim-elegante',
  'Solar Slim Elegante',
  590.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80', 'https://images.unsplash.com/photo-1641206988022-bd9a6f5e31b3?w=800&q=80'],
  'Relogio ultra-slim alimentado a energia solar. Apenas 6mm de espessura total. Mostrador branco minimalista com segundeiro subdial.',
  '{"movement": "Solar Eco-Drive — Citizen E111", "caseMaterial": "Aco Inoxidavel 316L", "caseDiameter": "38mm", "waterResistance": "30m / 3 ATM", "dialColor": "Branco Opalescente", "strapMaterial": "Couro Italiano Bege", "crystalType": "Safira", "reference": "LM-SLR-009"}'::jsonb
),

(
  'vintage-inspired-automatico',
  'Vintage Inspired Automatico',
  990.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800&q=80', 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=80'],
  'Relogio de inspiracao vintage dos anos 60. Mostrador creme envelhecido tropical dial. Pulseira de couro envelhecido com rebite duplo. Caixa de aco polido de espessura classica.',
  '{"movement": "Automatico — ETA 2824-2", "caseMaterial": "Aco Inoxidavel 316L polido", "caseDiameter": "38mm", "waterResistance": "50m / 5 ATM", "dialColor": "Creme Tropical Dial", "strapMaterial": "Couro Envelhecido com Rebite", "crystalType": "Mineral Hardlex", "powerReserve": "38 horas", "reference": "LM-VNT-010"}'::jsonb
),

(
  'ceramica-black-automatico',
  'Ceramica Black Automatico',
  2190.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&q=80', 'https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=800&q=80'],
  'Relogio total black em ceramica de alta tecnologia. Resistente a arranhoes. Luneta em ceramica preta com numeracao a laser. Mostrador DLC black mate.',
  '{"movement": "Automatico Swiss Made — ETA 2836-2", "caseMaterial": "Ceramica de Alta Tecnologia", "caseDiameter": "44mm", "waterResistance": "100m / 10 ATM", "dialColor": "Preto DLC Mate", "strapMaterial": "Bracelete Ceramica Preta", "crystalType": "Safira Anti-reflexo", "powerReserve": "42 horas", "reference": "LM-CER-011"}'::jsonb
),

(
  'gmt-viajante-automatico',
  'GMT Viajante Automatico',
  1690.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1559562898-7f9037d9b3f9?w=800&q=80', 'https://images.unsplash.com/photo-1615537182514-ee64048c60e4?w=800&q=80'],
  'Relogio GMT com segunda zona horaria independente. Luneta bidireccional de 24h em acrilico laranja e preto. Mostrador azul dia/noite.',
  '{"movement": "Automatico Swiss Made GMT — ETA 2893-2", "caseMaterial": "Aco Inoxidavel 316L escovado", "caseDiameter": "41mm", "waterResistance": "100m / 10 ATM", "dialColor": "Azul Dia/Noite", "strapMaterial": "Bracelete Jubilee Aco", "crystalType": "Safira Anti-reflexo", "powerReserve": "42 horas", "reference": "LM-GMT-012"}'::jsonb
),

(
  'cronografo-panda-dial',
  'Cronografo Panda Dial',
  1390.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1548690596-f1722c190938?w=800&q=80', 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80'],
  'Cronografo Panda Dial classico. Mostrador branco com sub-dials pretos a 3h e 9h. Taquimetro no aro externo. Pulseira de couro marrom envelhecido.',
  '{"movement": "Quartzo Cronografo — Seiko VK64", "caseMaterial": "Aco Inoxidavel 316L polido", "caseDiameter": "42mm", "waterResistance": "50m / 5 ATM", "dialColor": "Branco Panda", "strapMaterial": "Couro Marrom Envelhecido", "crystalType": "Safira", "reference": "LM-PND-013"}'::jsonb
),

(
  'relogio-feminino-dourado-slim',
  'Relogio Feminino Dourado Slim',
  690.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80', 'https://images.unsplash.com/photo-1641206988022-bd9a6f5e31b3?w=800&q=80'],
  'Relogio slim feminino em aco com banho dourado 3 microns. Mostrador branco com marcadores romanos. Bracelete mesh milanes ajustavel.',
  '{"movement": "Quartzo Japones — Miyota 2025", "caseMaterial": "Aco Inoxidavel 316L com Banho Dourado", "caseDiameter": "32mm", "waterResistance": "30m / 3 ATM", "dialColor": "Branco com Algarismos Romanos", "strapMaterial": "Mesh Milanes Dourado Ajustavel", "crystalType": "Mineral", "reference": "LM-FEM-014"}'::jsonb
),

(
  'field-watch-bronze',
  'Field Watch Bronze',
  1090.00,
  'watch',
  3,
  ARRAY['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80', 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800&q=80'],
  'Field watch em bronze CuSn8. A patina desenvolve-se com o tempo tornando cada relogio unico. Mostrador verde musgo mate. Resistencia a choques.',
  '{"movement": "Automatico — ETA 2824-2", "caseMaterial": "Bronze CuSn8 (desenvolve patina natural)", "caseDiameter": "41mm", "waterResistance": "200m / 20 ATM", "dialColor": "Verde Musgo Mate", "strapMaterial": "NATO Verde Militar", "crystalType": "Safira Anti-reflexo", "powerReserve": "38 horas", "reference": "LM-FLD-015"}'::jsonb
),

-- ============================================================
-- ACCESSORIES (15 products) — stock: 10
-- ============================================================

(
  'corrente-prata-veneziana-50cm',
  'Corrente Veneziana Prata 925',
  189.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80'],
  'Corrente veneziana em prata 925 com banho em rodio para maior durabilidade. Elo veneziano 3mm de espessura. Comprimento 50cm. Fecho de lagosta.',
  '{"material": "Prata 925 com Banho Rodio", "tier": "premium", "dimensions": "50cm x 3mm", "weight": "8g", "closure": "Fecho de Lagosta", "gender": "masculine", "subcategory": "Correntes"}'::jsonb
),

(
  'cordao-ouro-18k-cubano',
  'Cordao Ouro 18k Cubano',
  2890.00,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'],
  'Cordao cubano em ouro macico 18k. Elo curbete 6mm trabalhado a mao. Fecho de caixa com seguro duplo. 55cm. Peso 38g.',
  '{"material": "Ouro Macico 18 Kilates", "tier": "premium", "dimensions": "55cm x 6mm", "weight": "38g", "closure": "Fecho de Caixa com Seguro Duplo", "warranty": "Garantia vitalicia", "gender": "masculine", "subcategory": "Correntes"}'::jsonb
),

(
  'pulseira-couro-premium-masculina',
  'Pulseira Couro Premium Masculina',
  89.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=800&q=80', 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80'],
  'Pulseira em couro vegetal full-grain italiano com fecho em aco inoxidavel. Costura a contraste. Disponivel em dois tamanhos.',
  '{"material": "Couro Vegetal Full-Grain Italiano", "tier": "standard", "dimensions": "Ajustavel 18-22cm", "weight": "12g", "closure": "Fecho em T de aco", "gender": "masculine", "subcategory": "Pulseiras"}'::jsonb
),

(
  'pulseira-prata-link-feminina',
  'Pulseira Link Prata 925 Feminina',
  149.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80'],
  'Pulseira link em prata 925. Elos redondos alternados polidos e escovados. Fecho box com seguro de borboleta. 19cm ajustavel.',
  '{"material": "Prata 925", "tier": "premium", "dimensions": "19cm ajustavel", "weight": "10g", "closure": "Fecho Box com Seguro Borboleta", "warranty": "2 anos", "gender": "feminine", "subcategory": "Pulseiras"}'::jsonb
),

(
  'anel-prata-signet-masculino',
  'Anel Signet Prata 925',
  129.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80', 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80'],
  'Anel signet em prata 925 macica. Escudo oval de 12x10mm. Interior arredondado para conforto maximo. Disponivel em tamanhos 17-22mm.',
  '{"material": "Prata 925 Macica", "tier": "premium", "dimensions": "Tamanhos 17-22mm", "weight": "6g", "gender": "masculine", "subcategory": "Aneis"}'::jsonb
),

(
  'anel-ouro-solitario-feminino',
  'Anel Solitario Ouro 18k',
  890.00,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'],
  'Anel solitario em ouro 18k com pedra central de zirconia cubica AAA de 1 quilate. Engaste de 4 garras. Acabamento polido brilhante. Inclui caixa premium.',
  '{"material": "Ouro 18 Kilates", "tier": "premium", "dimensions": "Tamanhos 14-20mm", "weight": "3.5g", "warranty": "Garantia vitalicia + certificado", "gender": "feminine", "subcategory": "Aneis"}'::jsonb
),

(
  'colar-ouro-delicado-feminino',
  'Colar Delicado Ouro 18k',
  349.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'],
  'Colar delicado em ouro 18k com corrente Forcat 1mm. Pingente de lua crescente com diamante 0.02ct. Comprimento 42cm ajustavel a 45cm.',
  '{"material": "Ouro 18 Kilates + Diamante Natural 0.02ct", "tier": "premium", "dimensions": "42-45cm ajustavel", "weight": "2.8g", "closure": "Fecho de Lagosta", "warranty": "2 anos", "gender": "feminine", "subcategory": "Colares"}'::jsonb
),

(
  'cinto-couro-genuino-fivela-prata',
  'Cinto Couro Genuino Fivela Prata',
  99.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80', 'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=800&q=80'],
  'Cinto em couro genuino italiano curtido a vegetal. Fivela em zamak niquelado prata. Largura 3.5cm. Disponivel em tamanhos 85-115cm.',
  '{"material": "Couro Genuino Italiano Curtido a Vegetal", "tier": "standard", "dimensions": "Largura 3.5cm, Tamanhos 85-115cm", "weight": "160g", "gender": "masculine", "subcategory": "Cintos"}'::jsonb
),

(
  'cinto-couro-feminino-slim',
  'Cinto Couro Slim Feminino',
  79.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=800&q=80', 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80'],
  'Cinto slim feminino em couro napa italiano 1.5cm de largura. Fivela dourada D-ring minimalista. Ideal para vestidos e calcas de cintura alta.',
  '{"material": "Couro Napa Italiano", "tier": "standard", "dimensions": "Largura 1.5cm, Tamanhos 70-95cm", "weight": "60g", "gender": "feminine", "subcategory": "Cintos"}'::jsonb
),

(
  'corrente-aco-inox-masculina-bold',
  'Corrente Aco Inox Bold Masculina',
  79.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'],
  'Corrente elo Figaro em aco inoxidavel 316L. Elo de 5mm polido. Hipoalergenica. Resistente a oxidacao. 60cm.',
  '{"material": "Aco Inoxidavel 316L", "tier": "standard", "dimensions": "60cm x 5mm", "weight": "15g", "closure": "Fecho de Lagosta", "gender": "masculine", "subcategory": "Correntes"}'::jsonb
),

(
  'brincos-argola-ouro-18k',
  'Brincos Argola Ouro 18k',
  289.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'],
  'Brincos argola em ouro 18k. Diametro 25mm. Espessura 2mm. Fecho borracha de seguranca. Par.',
  '{"material": "Ouro 18 Kilates", "tier": "premium", "dimensions": "Diametro 25mm", "weight": "3g (par)", "warranty": "1 ano", "gender": "feminine", "subcategory": "Brincos"}'::jsonb
),

(
  'pulseira-macrame-luxury',
  'Pulseira Macrame Luxury',
  59.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80', 'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=800&q=80'],
  'Pulseira de macrame artesanal com fecho e argola de prata 925. Cordao encerado multicolor. Ajustavel por no deslizante.',
  '{"material": "Cordao Encerado + Prata 925", "tier": "standard", "dimensions": "Ajustavel 15-22cm", "gender": "unisex", "subcategory": "Pulseiras"}'::jsonb
),

(
  'colar-masculino-figaro-prata',
  'Colar Masculino Figaro Prata',
  119.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80'],
  'Colar masculino elo Figaro em prata 925. Alternancia de elos largos e estreitos. 55cm. Peso 12g.',
  '{"material": "Prata 925", "tier": "standard", "dimensions": "55cm", "weight": "12g", "closure": "Fecho de Lagosta", "gender": "masculine", "subcategory": "Colares"}'::jsonb
),

(
  'anel-tungsteno-masculino',
  'Anel Tungstenio Masculino',
  89.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80', 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80'],
  'Anel de tungstenio polido 8mm. Material 4x mais duro que o aco inox. Praticamente impossivel de arranhar. Acabamento mirror polished.',
  '{"material": "Tungstenio de Alta Pureza", "tier": "standard", "dimensions": "Largura 8mm, Tamanhos 17-25mm", "weight": "14g", "gender": "masculine", "subcategory": "Aneis"}'::jsonb
),

(
  'brincos-prata-925-stud-minimal',
  'Brincos Stud Minimal Prata 925',
  69.90,
  'accessory',
  10,
  ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80'],
  'Brincos stud em prata 925 com pedra de zirconia 4mm. Design minimalista, adequado para uso diario. Haste padrao + borracha de seguranca. Par.',
  '{"material": "Prata 925 + Zirconia 4mm", "tier": "standard", "dimensions": "Pedra 4mm", "weight": "1g (par)", "gender": "unisex", "subcategory": "Brincos"}'::jsonb
)

ON CONFLICT (slug) DO NOTHING;
