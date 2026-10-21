/*
 * Story data. One QR code per story: https://your-site/?story=<id>
 *
 * A story is: a cover, a list of chapters, and an ending.
 * Chapter text is a list of paragraphs per language. The app splits the
 * paragraphs into pages automatically to fit whatever screen is in use.
 *
 * cover.scene.items : [emoji, x%, y%, size, animation?, flip?]
 * chapter.icon      : small emoji shown above the chapter title
 * chapter.tint      : 'warm' | 'mint' | 'sky' | 'peach'  (page colour)
 */
window.DEFAULT_STORY = 'sang-kancil-buaya';

window.STORIES = {
  'sang-kancil-buaya': {
    title: { en: 'Sang Kancil and the Crocodiles', bm: 'Sang Kancil dan Buaya' },
    subtitle: { en: 'A Malaysian folk tale', bm: 'Cerita rakyat Malaysia' },

    cover: {
      theme: 'sunset',
      items: [
        ['☀️', 16, 18, 16, 'pulse'], ['🌴', 88, 50, 36], ['🌴', 10, 58, 30],
        ['🦌', 34, 68, 30, 'bob'], ['🐊', 72, 76, 26, 'wiggle', 1]
      ]
    },

    chapters: [
      {
        icon: '🌴', tint: 'mint',
        title: { en: 'The Little Mousedeer', bm: 'Si Pelanduk Kecil' },
        text: {
          en: [
            'Long ago, deep in the green forests of Malaysia, where the tall trees brushed the clouds and the monkeys chattered from dawn until dusk, there lived a very small animal named Sang Kancil.',
            'Kancil was a mousedeer. He was no bigger than a cat, with thin legs, big dark eyes and ears that twitched at the slightest sound. He could not fight the tiger, and he could not outrun the wild boar. But the other animals said that Kancil had something far more powerful than claws or tusks. He had a quick and clever mind.',
            'Whenever danger came near, Kancil did not panic. He would stand very still, take a slow breath, and think. “A strong animal can win a fight,” he liked to say, “but a clever animal can often avoid the fight altogether.”',
            'That season, the weather had been hot and dry for many weeks. The fruit trees in Kancil’s part of the forest had given all they could, and the branches hung bare. Each morning Kancil searched under every tree, and each morning his tummy rumbled louder than the morning before.'
          ],
          bm: [
            'Pada zaman dahulu, jauh di dalam hutan hijau Malaysia, tempat pokok-pokok tinggi mencecah awan dan kera berceloteh dari pagi hingga petang, tinggallah seekor haiwan yang sangat kecil bernama Sang Kancil.',
            'Kancil ialah seekor pelanduk. Badannya tidak lebih besar daripada seekor kucing, dengan kaki yang kurus, mata yang bulat dan hitam, serta telinga yang bergerak-gerak apabila terdengar bunyi yang kecil. Dia tidak mampu melawan harimau, dan tidak dapat berlari lebih laju daripada babi hutan. Namun, haiwan-haiwan lain berkata bahawa Kancil memiliki sesuatu yang jauh lebih hebat daripada cakar atau taring. Dia mempunyai fikiran yang cerdas dan pantas.',
            'Setiap kali bahaya menghampiri, Kancil tidak panik. Dia akan berdiri tegak, menarik nafas perlahan-lahan, lalu berfikir. “Haiwan yang kuat boleh menang dalam pergaduhan,” katanya, “tetapi haiwan yang bijak sering dapat mengelak daripada pergaduhan itu.”',
            'Pada musim itu, cuaca panas dan kering selama berminggu-minggu. Pokok-pokok buah di bahagian hutan tempat tinggal Kancil telah habis berbuah, dan dahannya kosong. Setiap pagi Kancil mencari di bawah setiap pokok, dan setiap pagi perutnya berkeroncong lebih kuat daripada pagi sebelumnya.'
          ]
        }
      },
      {
        icon: '🌊', tint: 'sky',
        title: { en: 'Across the Water', bm: 'Di Seberang Sungai' },
        text: {
          en: [
            'One morning, Kancil wandered farther than he had ever gone before. He pushed through thick ferns, stepped over twisting roots, and followed a faint, sweet smell on the breeze. At last the trees opened up, and he found himself standing on the bank of a wide, slow, muddy river.',
            'Kancil gasped. On the other side, the trees were heavy with fruit! There were golden mangoes, red rambutans and purple mangosteens, so ripe that some had already fallen to the ground. The sweet smell made his mouth water.',
            '“If only I could get over there,” he sighed. But the river was too wide and too deep for such a small animal to swim across. The current would sweep him away before he reached the middle.',
            'Then something moved in the water. Kancil looked closer. What he had thought were old logs floating in the river began to blink. Eyes! Dozens of eyes, and long, bumpy backs, and rows of sharp teeth. The river was full of crocodiles, and they were watching him hungrily.',
            '“Well, well,” rumbled the biggest crocodile, whose name was Raja Buaya. “Look what has come for lunch.”'
          ],
          bm: [
            'Pada suatu pagi, Kancil mengembara lebih jauh daripada yang pernah dilakukannya. Dia menyusup melalui pakis yang lebat, melangkah di atas akar-akar yang berselirat, dan mengikut bau manis yang dibawa angin. Akhirnya, pokok-pokok mula jarang, dan dia tiba di tebing sebatang sungai yang lebar, perlahan dan keruh.',
            'Kancil terkejut. Di seberang sana, pokok-pokok sarat dengan buah! Ada mempelam yang kuning keemasan, rambutan yang merah, dan manggis yang ungu, begitu masak sehingga ada yang sudah gugur ke tanah. Bau manisnya membuatkan Kancil meleleh air liur.',
            '“Alangkah baiknya jika aku dapat ke sana,” keluhnya. Namun, sungai itu terlalu lebar dan terlalu dalam untuk haiwan sekecil dirinya. Arus akan menghanyutkannya sebelum dia sampai ke tengah.',
            'Tiba-tiba, ada sesuatu bergerak di dalam air. Kancil memerhati dengan lebih teliti. Apa yang disangkanya batang kayu yang terapung itu mula berkelip. Mata! Berpuluh-puluh mata, dengan belakang yang panjang dan berbenjol, serta barisan gigi yang tajam. Sungai itu penuh dengan buaya, dan mereka memerhatikannya dengan penuh kelaparan.',
            '“Hmm, hmm,” gumam buaya yang paling besar, yang bernama Raja Buaya. “Lihatlah siapa yang datang untuk makan tengah hari kita.”'
          ]
        }
      },
      {
        icon: '💡', tint: 'warm',
        title: { en: 'A Clever Idea', bm: 'Satu Akal yang Bijak' },
        text: {
          en: [
            'Kancil’s heart thumped so hard he was sure the crocodiles could hear it. His legs wanted to run. But he remembered what he always told himself: when danger comes, do not panic. Think.',
            'He stood very still, and he looked at the crocodiles carefully. They were big and strong, yes. But they were also greedy, proud, and a little lazy. They loved to eat, and they loved to feel important. And there were so many of them, packed side by side in the river.',
            '“Many crocodiles,” Kancil whispered to himself. “Side by side. If they were in a straight line, they would be like a bridge.”',
            'A smile slowly spread across his face. He cleared his throat, stepped bravely to the very edge of the water, and called out in his cheeriest voice.'
          ],
          bm: [
            'Jantung Kancil berdegup begitu kuat sehingga dia pasti buaya-buaya itu dapat mendengarnya. Kakinya mahu berlari. Tetapi dia teringat apa yang selalu dikatakannya kepada dirinya sendiri: apabila bahaya datang, jangan panik. Berfikirlah.',
            'Dia berdiri tegak dan memerhati buaya-buaya itu dengan teliti. Mereka besar dan kuat, memang benar. Tetapi mereka juga tamak, bangga diri, dan agak malas. Mereka suka makan, dan mereka suka berasa penting. Lagipun, ada begitu banyak buaya, berhimpit-himpit di dalam sungai.',
            '“Banyak buaya,” bisik Kancil kepada dirinya. “Bersebelahan. Jika mereka berbaris lurus, mereka akan menjadi seperti sebuah jambatan.”',
            'Senyuman perlahan-lahan terukir di wajahnya. Dia berdeham, melangkah dengan berani ke tepi air, lalu menjerit dengan suara yang paling ceria.'
          ]
        }
      },
      {
        icon: '👑', tint: 'peach',
        title: { en: 'The King’s Feast', bm: 'Kenduri Raja' },
        text: {
          en: [
            '“Good afternoon, Raja Buaya! Good afternoon, everyone! What a lucky day this is for you!”',
            'The crocodiles blinked in surprise. They had expected a frightened animal, not a cheerful one. “Lucky?” growled Raja Buaya. “What do you mean, little one?”',
            '“Why, haven’t you heard?” said Kancil, widening his eyes. “The King of the forest is holding a great feast tomorrow, and he has sent me to invite every crocodile in this river. There will be fish, and chicken, and roasted meat, more than you can ever eat!”',
            'The crocodiles began to murmur excitedly. Their tails splashed. But Raja Buaya narrowed his eyes. “Why should we believe you?”',
            '“I do not ask you to believe me,” said Kancil calmly. “But the King told me to count how many of you there are, so that the cooks know how much food to prepare. If you would rather not come, I will tell him, and he can invite the crocodiles from the next river instead.”',
            'This was exactly what the crocodiles feared. They did not want another river’s crocodiles to eat their feast! “No, no!” they cried. “We will come! Count us! Count us now!”',
            '“Very well,” said Kancil, hiding a smile. “Please line up from this bank to the other, side by side, so I can count you properly. And please hold still, because I must be careful not to lose count.”'
          ],
          bm: [
            '“Selamat petang, Raja Buaya! Selamat petang, semua! Alangkah bertuahnya kamu hari ini!”',
            'Buaya-buaya itu berkelip-kelip kehairanan. Mereka menjangka akan bertemu haiwan yang ketakutan, bukan yang ceria. “Bertuah?” geram Raja Buaya. “Apa maksudmu, wahai si kecil?”',
            '“Eh, kamu belum dengar?” kata Kancil sambil membulatkan matanya. “Raja hutan akan mengadakan kenduri besar esok, dan baginda menyuruh aku menjemput setiap ekor buaya di sungai ini. Akan ada ikan, ayam, dan daging bakar, lebih banyak daripada yang mampu kamu makan!”',
            'Buaya-buaya itu mula berbisik dengan teruja. Ekor mereka memercikkan air. Tetapi Raja Buaya menyempitkan matanya. “Mengapa kami harus mempercayaimu?”',
            '“Aku tidak meminta kamu percaya,” jawab Kancil dengan tenang. “Tetapi baginda menyuruh aku mengira bilangan kamu, supaya tukang masak tahu berapa banyak makanan perlu disediakan. Jika kamu tidak mahu datang, aku akan memberitahu baginda, dan baginda boleh menjemput buaya dari sungai sebelah sahaja.”',
            'Inilah yang paling ditakuti oleh buaya-buaya itu. Mereka tidak mahu buaya dari sungai lain menikmati kenduri mereka! “Jangan, jangan!” jerit mereka. “Kami akan datang! Hitunglah kami! Hitunglah sekarang!”',
            '“Baiklah,” kata Kancil sambil menyembunyikan senyumannya. “Sila berbaris dari tebing ini ke tebing sana, bersebelahan, supaya aku dapat mengira dengan betul. Dan tolong jangan bergerak, kerana aku tidak mahu tersalah kira.”'
          ]
        }
      },
      {
        icon: '🐊', tint: 'sky',
        title: { en: 'One, Two, Three…', bm: 'Satu, Dua, Tiga…' },
        text: {
          en: [
            'Splash, shuffle, bump! The crocodiles pushed and shoved until they formed one long, bumpy line from one side of the river to the other. Their backs poked out of the water like stepping stones.',
            'Kancil took a deep breath. His legs trembled, but his voice stayed steady. He hopped lightly onto the back of the first crocodile. “One!”',
            'Hop. “Two!” Hop. “Three!” Hop, hop, hop. Kancil moved from back to back, tapping each crocodile on the head as he counted. “Four! Five! Six! Seven!”',
            'The crocodiles felt very important. “Don’t forget to tell the King how handsome I am,” whispered one. “Tell him I am the biggest,” boasted another. “Of course, of course,” said Kancil. “Eight! Nine! Ten!”',
            'The river was wide, and the line was long. Kancil’s heart was pounding, but he kept counting, kept hopping, and kept smiling. Not once did he look down at the teeth beneath him. Soon he could see the muddy bank ahead, and the red rambutans shining behind it.',
            '“Forty-nine! Fifty!” Kancil sprang off the last crocodile’s back with all the strength in his little legs, and landed safely on the far bank.'
          ],
          bm: [
            'Percik, lenggok, langgar! Buaya-buaya itu bertolak-tolakan sehingga membentuk satu barisan panjang yang berbenjol-benjol dari satu tebing sungai ke tebing yang satu lagi. Belakang mereka tersembul dari air seperti batu loncatan.',
            'Kancil menarik nafas dalam-dalam. Kakinya menggigil, tetapi suaranya tetap tenang. Dia melompat ringan ke atas belakang buaya yang pertama. “Satu!”',
            'Lompat. “Dua!” Lompat. “Tiga!” Lompat, lompat, lompat. Kancil bergerak dari belakang ke belakang, mengetuk kepala setiap buaya sambil mengira. “Empat! Lima! Enam! Tujuh!”',
            'Buaya-buaya itu berasa sangat penting. “Jangan lupa beritahu Raja betapa tampannya aku,” bisik seekor. “Beritahu baginda aku yang paling besar,” bangga seekor lagi. “Pasti, pasti,” kata Kancil. “Lapan! Sembilan! Sepuluh!”',
            'Sungai itu lebar, dan barisan itu panjang. Jantung Kancil berdegup kencang, tetapi dia terus mengira, terus melompat, dan terus tersenyum. Sekali pun dia tidak menunduk melihat gigi-gigi di bawahnya. Tidak lama kemudian, dia dapat melihat tebing berlumpur di hadapan, dan rambutan merah yang berkilau di belakangnya.',
            '“Empat puluh sembilan! Lima puluh!” Kancil melompat dari belakang buaya yang terakhir dengan segala kekuatan kaki kecilnya, lalu mendarat dengan selamat di tebing seberang.'
          ]
        }
      },
      {
        icon: '🍎', tint: 'mint',
        title: { en: 'The Sweetest Fruit', bm: 'Buah yang Paling Manis' },
        text: {
          en: [
            'Kancil turned around and bowed low. “Thank you, my friends, for being such a fine bridge!” he called. “There is no feast, and there is no invitation from the King. I only wanted to cross the river!”',
            'For a moment, the river was silent. Then it erupted. The crocodiles roared and thrashed and snapped their jaws, but there was nothing they could do. Kancil was far beyond their reach, and he was already walking toward the trees, laughing.',
            'Raja Buaya sank slowly into the water, his face red with shame. “We were fooled by a mousedeer,” he muttered. “Fooled because we were greedy, and because we wanted to feel important.”',
            'Kancil ate until his tummy was round and full. The mangoes were golden and juicy, the rambutans were sweet, and the mangosteens melted on his tongue. It was the best meal he had ever eaten. When the sun began to set, he found a soft bed of leaves and fell asleep with a smile.',
            'And that is why, the old people say, the crocodiles of the river still lie so quietly with their eyes just above the water, watching and waiting, never trusting a cheerful stranger again.'
          ],
          bm: [
            'Kancil berpaling dan tunduk hormat. “Terima kasih, sahabat-sahabatku, kerana menjadi jambatan yang begitu baik!” laungnya. “Tiada kenduri, dan tiada jemputan daripada Raja. Aku cuma mahu menyeberangi sungai!”',
            'Seketika, sungai itu sunyi. Kemudian ia bergelora. Buaya-buaya itu menjerit, menghentak dan mengatup rahang mereka, tetapi tiada apa yang dapat mereka lakukan. Kancil sudah jauh di luar jangkauan mereka, dan dia sudah berjalan menuju pokok-pokok buah sambil ketawa.',
            'Raja Buaya tenggelam perlahan-lahan ke dalam air, wajahnya merah kerana malu. “Kita diperdayakan oleh seekor pelanduk,” gumamnya. “Diperdayakan kerana kita tamak, dan kerana kita mahu berasa penting.”',
            'Kancil makan sehingga perutnya bulat dan kenyang. Mempelam itu kuning keemasan dan berair, rambutan itu manis, dan manggis itu cair di lidahnya. Itulah hidangan terbaik yang pernah dimakannya. Apabila matahari mula terbenam, dia menemui tilam daun yang lembut lalu tertidur sambil tersenyum.',
            'Dan itulah sebabnya, kata orang tua-tua, buaya-buaya di sungai masih berbaring dengan begitu tenang, mata mereka tersembul di atas air, memerhati dan menunggu, tidak pernah lagi mempercayai orang asing yang ceria.'
          ]
        }
      }
    ],

    end: {
      title: { en: 'The End', bm: 'Tamat' },
      moral: {
        en: 'Staying calm and thinking carefully can help us solve big problems.',
        bm: 'Bertenang dan berfikir dengan teliti dapat membantu kita menyelesaikan masalah besar.'
      },
      questions: {
        en: [
          'Why did Kancil stay calm instead of running away?',
          'Was it kind to trick the crocodiles? What else could Kancil have done?'
        ],
        bm: [
          'Mengapa Kancil bertenang dan tidak melarikan diri?',
          'Adakah baik memperdayakan buaya-buaya itu? Apa lagi yang boleh Kancil lakukan?'
        ]
      },
      more: {
        en: 'Want another story? Scan another QR code on the wall!',
        bm: 'Mahu cerita lain? Imbas kod QR lain di dinding!'
      }
    }
  }
};
