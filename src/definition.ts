export interface NodeContent {
  classList: string[]
  children: Content[]
}
  
export interface Content {
  textContent: string
  tagName: string[]
}

export class Chapter {
  constructor(
    public title: NodeContent[] = [],
    public content: NodeContent[] = [],
    public parts: {
      title: NodeContent[]
      content: NodeContent[]
    }[] = []
  ) {}
}

export const genre = {
  'sf_history': 'Альтернативная история',
  'sf_action': 'Боевая фантастика',
  'sf_epic': 'Эпическая фантастика',
  'sf_heroic': 'Героическая фантастика',
  'sf_detective': 'Детективная фантастика',
  'sf_cyberpunk': 'Киберпанк',
  'sf_space': 'Космическая фантастика',
  'sf_social': 'Социально-психологическая фантастика',
  'sf_horror': 'Ужасы и Мистика',
  'sf_humor': 'Юмористическая фантастика',
  'sf_fantasy': 'Фэнтези',
  'sf': 'Научная Фантастика',

  'det_classic': 'Классический детектив',
  'det_police': 'Полицейский детектив',
  'det_action': 'Боевик',
  'det_irony': 'Иронический детектив',
  'det_history': 'Исторический детектив',
  'det_espionage': 'Шпионский детектив',
  'det_crime': 'Криминальный детектив',
  'det_political': 'Политический детектив',
  'det_maniac': 'Маньяки',
  'det_hard': 'Крутой детектив',
  'thriller': 'Триллер',
  'detective': 'Детектив',

  'prose_classic': 'Классическая проза',
  'prose_history': 'Историческая проза',
  'prose_contemporary': 'Современная прозa',
  'prose_counter': 'Контркультура',
  'prose_rus_classic': 'Русская классическая проза',
  'prose_su_classics': 'Советская классическая проза',

  'love_contemporary': 'Современные любовные романы',
  'love_history': 'Исторические любовные романы',
  'love_detective': 'Остросюжетные любовные романы',
  'love_short': 'Короткие любовные романы',
  'love_erotica': 'Эротика',

  'adv_western': 'Вестерн',
  'adv_history': 'Исторические приключения',
  'adv_indian': 'Приключения про индейцев',
  'adv_maritime': 'Морские приключения',
  'adv_geo': 'Путешествия и география',
  'adv_animal': 'Природа и животные',
  'adventure': 'Приключения',

  'child_tale': 'Сказка',
  'child_verse': 'Детские стихи',
  'child_prose': 'Детскиая проза',
  'child_sf': 'Детская фантастика',
  'child_det': 'Детские остросюжетные',
  'child_adv': 'Детские приключения',
  'child_education': 'Детская образовательная литература',
  'children': 'Детская литература',

  'poetry': 'Поэзия',
  'dramaturgy': 'Драматургия',

  'antique_ant': 'Античная литература',
  'antique_european': 'Европейская старинная литература',
  'antique_russian': 'Древнерусская литература',
  'antique_east': 'Древневосточная литература',
  'antique_myths': 'Мифы. Легенды. Эпос',
  'antique': 'Старинная литература',

  'sci_history': 'История',
  'sci_psychology': 'Психология',
  'sci_culture': 'Культурология',
  'sci_religion': 'Религиоведение',
  'sci_philosophy': 'Философия',
  'sci_politics': 'Политика',
  'sci_business': 'Деловая литература',
  'sci_juris': 'Юриспруденция',
  'sci_linguistic': 'Языкознание',
  'sci_medicine': 'Медицина',
  'sci_phys': 'Физика',
  'sci_math': 'Математика',
  'sci_chem': 'Химия',
  'sci_biology': 'Биология',
  'sci_tech': 'Технические науки',
  'science': 'Научная литература',

  'comp_www': 'Интернет',
  'comp_programming': 'Программирование',
  'comp_hard': 'Аппаратное обеспечение',
  'comp_soft': 'Программы',
  'comp_db': 'Базы данных',
  'comp_osnet': 'ОС и Сети',
  'computers': 'Компьтерная литература',

  'ref_encyc': 'Энциклопедии',
  'ref_dict': 'Словари',
  'ref_ref': 'Справочники',
  'ref_guide': 'Руководства',
  'reference': 'Справочная литература',

  'nonf_biography': 'Биографии и Мемуары',
  'nonf_publicism': 'Публицистика',
  'nonf_criticism': 'Критика',
  'design': 'Искусство и Дизайн',
  'nonfiction': 'Документальная литература',

  'religion_rel': 'Религия',
  'religion_esoterics': 'Эзотерика',
  'religion_self': 'Самосовершенствование',
  'religion': 'Религионая литература',

  'humor_anecdote': 'Анекдоты',
  'humor_prose': 'Юмористическая проза',
  'humor_verse': 'Юмористические стихи',
  'humor': 'Юмористическая литература',

  'home_cooking': 'Кулинария',
  'home_pets': 'Домашние животные',
  'home_crafts': 'Хобби и ремесла',
  'home_entertain': 'Развлечения',
  'home_health': 'Здоровье',
  'home_garden': 'Сад и огород',
  'home_diy': 'Сделай сам',
  'home_sport': 'Спорт',
  'home_sex': 'Эротика',
  'home': 'Домоводство'
}