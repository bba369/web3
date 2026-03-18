import { Phase } from './types';

export const ROADMAP_DATA: Phase[] = [
  {
    id: 1,
    title: "Phase 1: Intro to Blockchain & Web3 Basics",
    nepaliTitle: "चरण १: ब्लकचेन र Web3 को परिचय",
    bannerImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800&h=400",
    summary: "Master the foundational concepts of decentralized technology, Bitcoin's origin, and the shift from Web2 to Web3.",
    nepaliSummary: "विकेन्द्रीकृत प्रविधि, बिटकोइनको उत्पत्ति, र Web2 बाट Web3 मा परिवर्तनको आधारभूत अवधारणाहरू मास्टर गर्नुहोस्।",
    days: [
      { 
        id: 1, 
        title: "What is Blockchain?", 
        nepaliTitle: "ब्लकचेन के हो?", 
        description: "Understand the core concept of decentralized ledgers.", 
        nepaliDescription: "विकेन्द्रीकृत लेजरहरूको मुख्य अवधारणा बुझ्नुहोस्।",
        lessonContent: "Blockchain is a distributed database that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data.",
        nepaliLessonContent: "ब्लकचेन एक वितरित डाटाबेस हो जसले रेकर्डहरूको निरन्तर बढ्दो सूची कायम राख्छ, जसलाई ब्लक भनिन्छ, जुन क्रिप्टोग्राफी प्रयोग गरेर जोडिएको र सुरक्षित हुन्छ। प्रत्येक ब्लकमा अघिल्लो ब्लकको क्रिप्टोग्राफिक ह्यास, टाइमस्ट्याम्प, र लेनदेन डाटा हुन्छ।",
        referenceLink: "https://ethereum.org/en/whitepaper/",
        vocabulary: [
          { word: "Distributed Database", definition: "A database that is spread across multiple locations or nodes.", nepaliWord: "वितरित डाटाबेस", nepaliDefinition: "धेरै स्थान वा नोडहरूमा फैलिएको डाटाबेस।" },
          { word: "Cryptography", definition: "The practice of secure communication in the presence of third parties.", nepaliWord: "क्रिप्टोग्राफी", nepaliDefinition: "तेस्रो पक्षहरूको उपस्थितिमा सुरक्षित सञ्चारको अभ्यास।" }
        ],
        keyPoints: [
          { point: "Blockchain is a chain of blocks containing data.", nepaliPoint: "ब्लकचेन डाटा समावेश गर्ने ब्लकहरूको श्रृंखला हो।" },
          { point: "It is decentralized and distributed.", nepaliPoint: "यो विकेन्द्रीकृत र वितरित छ।" }
        ]
      },
      { 
        id: 2, 
        title: "History of Bitcoin", 
        nepaliTitle: "बिटकोइनको इतिहास", 
        description: "Learn about Satoshi Nakamoto and the genesis block.", 
        nepaliDescription: "सातोशी नाकामोतो र जेनेसिस ब्लकको बारेमा जान्नुहोस्।",
        lessonContent: "Bitcoin was created in 2008 by an anonymous person or group named Satoshi Nakamoto as a response to the financial crisis. It introduced the first practical solution to the double-spending problem without a central authority.",
        nepaliLessonContent: "बिटकोइन २००८ मा सातोशी नाकामोतो नामको अज्ञात व्यक्ति वा समूहद्वारा वित्तीय संकटको प्रतिक्रियाको रूपमा सिर्जना गरिएको थियो। यसले केन्द्रीय अख्तियार बिना डबल-स्पेन्डिङ समस्याको पहिलो व्यावहारिक समाधान प्रस्तुत गर्‍यो।",
        referenceLink: "https://bitcoin.org/bitcoin.pdf",
        vocabulary: [
          { word: "Genesis Block", definition: "The first block of a blockchain.", nepaliWord: "जेनेसिस ब्लक", nepaliDefinition: "ब्लकचेनको पहिलो ब्लक।" },
          { word: "Double-Spending", definition: "The risk that a digital currency can be spent twice.", nepaliWord: "डबल-स्पेन्डिङ", nepaliDefinition: "डिजिटल मुद्रा दुई पटक खर्च हुन सक्ने जोखिम।" }
        ],
        keyPoints: [
          { point: "Bitcoin was the first successful cryptocurrency.", nepaliPoint: "बिटकोइन पहिलो सफल क्रिप्टोकरेन्सी थियो।" },
          { point: "Satoshi Nakamoto is the pseudonymous creator.", nepaliPoint: "सातोशी नाकामोतो छद्म नामको सिर्जनाकर्ता हुन्।" }
        ]
      },
      { 
        id: 3, 
        title: "Web1 vs Web2 vs Web3", 
        nepaliTitle: "Web1 बनाम Web2 बनाम Web3", 
        description: "The evolution of the internet from read-only to read-write-own.", 
        nepaliDescription: "इन्टरनेटको विकास: पढ्ने मात्र देखि पढ्ने-लेख्ने-स्वामित्व सम्म।",
        lessonContent: "Web1 was static (read-only). Web2 is social/centralized (read-write). Web3 is decentralized (read-write-own), powered by blockchain and tokens.",
        nepaliLessonContent: "Web1 स्थिर (पढ्ने मात्र) थियो। Web2 सामाजिक/केन्द्रीकृत (पढ्ने-लेख्ने) हो। Web3 विकेन्द्रीकृत (पढ्ने-लेख्ने-स्वामित्व) हो, जुन ब्लकचेन र टोकनहरूद्वारा संचालित हुन्छ।",
        referenceLink: "https://ethereum.org/en/web3/",
        vocabulary: [
          { word: "Read-Write-Own", definition: "The core philosophy of Web3 where users own their data and assets.", nepaliWord: "पढ्ने-लेख्ने-स्वामित्व", nepaliDefinition: "Web3 को मुख्य दर्शन जहाँ प्रयोगकर्ताहरूले आफ्नै डाटा र सम्पत्तिहरूको स्वामित्व लिन्छन्।" },
          { word: "Decentralized", definition: "Not controlled by a single central authority.", nepaliWord: "विकेन्द्रीकृत", nepaliDefinition: "एकल केन्द्रीय अख्तियारद्वारा नियन्त्रित नभएको।" }
        ],
        keyPoints: [
          { point: "Web1: Read-only (Static).", nepaliPoint: "Web1: पढ्ने मात्र (स्थिर)।" },
          { point: "Web2: Read-Write (Social/Centralized).", nepaliPoint: "Web2: पढ्ने-लेख्ने (सामाजिक/केन्द्रीकृत)।" },
          { point: "Web3: Read-Write-Own (Decentralized).", nepaliPoint: "Web3: पढ्ने-लेख्ने-स्वामित्व (विकेन्द्रीकृत)।" }
        ]
      },
      { 
        id: 4, 
        title: "Decentralization", 
        nepaliTitle: "विकेन्द्रीकरण", 
        description: "Why removing central authorities matters.", 
        nepaliDescription: "केन्द्रीय अधिकारीहरू हटाउनु किन महत्त्वपूर्ण छ।",
        lessonContent: "Decentralization refers to the transfer of control and decision-making from a centralized entity to a distributed network.",
        nepaliLessonContent: "विकेन्द्रीकरणले केन्द्रीकृत निकायबाट वितरित नेटवर्कमा नियन्त्रण र निर्णय लिने प्रक्रियाको हस्तान्तरणलाई बुझाउँछ।",
        referenceLink: "https://aws.amazon.com/blockchain/what-is-blockchain-decentralization/",
        vocabulary: [
          { word: "Distributed Network", definition: "A network where data and processing are spread across multiple nodes.", nepaliWord: "वितरित नेटवर्क", nepaliDefinition: "डाटा र प्रशोधन धेरै नोडहरूमा फैलिएको नेटवर्क।" },
          { word: "Censorship Resistance", definition: "The ability of a system to prevent any entity from blocking transactions.", nepaliWord: "सेन्सरशिप प्रतिरोध", nepaliDefinition: "कुनै पनि निकायलाई लेनदेन रोक्नबाट रोक्ने प्रणालीको क्षमता।" }
        ],
        keyPoints: [
          { point: "Decentralization removes single points of failure.", nepaliPoint: "विकेन्द्रीकरणले असफलताको एकल बिन्दुहरू हटाउँछ।" },
          { point: "It increases security and transparency.", nepaliPoint: "यसले सुरक्षा र पारदर्शिता बढाउँछ।" }
        ]
      },
      { 
        id: 5, 
        title: "Cryptography Basics", 
        nepaliTitle: "क्रिप्टोग्राफी आधारभूत", 
        description: "Hashing, Public/Private keys, and Digital Signatures.", 
        nepaliDescription: "ह्यासिङ, सार्वजनिक/निजी कुञ्जीहरू, र डिजिटल हस्ताक्षरहरू।",
        lessonContent: "Cryptography secures blockchain data. Public keys act like addresses, while private keys act like passwords to sign transactions.",
        nepaliLessonContent: "क्रिप्टोग्राफीले ब्लकचेन डाटा सुरक्षित गर्दछ। सार्वजनिक कुञ्जीहरू ठेगाना जस्तै काम गर्छन्, जबकि निजी कुञ्जीहरू लेनदेन हस्ताक्षर गर्न पासवर्ड जस्तै काम गर्छन्।",
        referenceLink: "https://en.wikipedia.org/wiki/Cryptography",
        vocabulary: [
          { word: "Public Key", definition: "A cryptographic key that can be shared with anyone to receive funds.", nepaliWord: "सार्वजनिक कुञ्जी", nepaliDefinition: "कोहीसँग पनि कोष प्राप्त गर्न साझा गर्न सकिने कुञ्जी।" },
          { word: "Private Key", definition: "A secret key used to sign transactions and access funds.", nepaliWord: "निजी कुञ्जी", nepaliDefinition: "लेनदेन हस्ताक्षर गर्न र कोष पहुँच गर्न प्रयोग गरिने गोप्य कुञ्जी।" }
        ],
        keyPoints: [
          { point: "Public key = Address, Private key = Signature.", nepaliPoint: "सार्वजनिक कुञ्जी = ठेगाना, निजी कुञ्जी = हस्ताक्षर।" },
          { point: "Never share your private key.", nepaliPoint: "आफ्नो निजी कुञ्जी कहिल्यै साझा नगर्नुहोस्।" }
        ]
      },
      { 
        id: 6, 
        title: "Consensus Mechanisms", 
        nepaliTitle: "सहमति संयन्त्र", 
        description: "How nodes agree on the state of the blockchain.", 
        nepaliDescription: "नोडहरू कसरी ब्लकचेनको अवस्थामा सहमत हुन्छन्।",
        lessonContent: "Consensus (PoW, PoS) ensures all nodes agree on valid transactions without needing a trusted third party.",
        nepaliLessonContent: "सहमति (PoW, PoS) ले सुनिश्चित गर्दछ कि सबै नोडहरू विश्वसनीय तेस्रो पक्षको आवश्यकता बिना मान्य लेनदेनहरूमा सहमत छन्।",
        referenceLink: "https://ethereum.org/en/developers/docs/consensus-mechanisms/",
        vocabulary: [
          { word: "Proof of Work (PoW)", definition: "A consensus mechanism where miners solve complex puzzles.", nepaliWord: "प्रूफ अफ वर्क (PoW)", nepaliDefinition: "खानीहरूले जटिल पजलहरू समाधान गर्ने सहमति संयन्त्र।" },
          { word: "Proof of Stake (PoS)", definition: "A consensus mechanism where validators are chosen based on their stake.", nepaliWord: "प्रूफ अफ स्टेक (PoS)", nepaliDefinition: "भ्यालिडेटरहरू उनीहरूको स्टेकको आधारमा छानिने सहमति संयन्त्र।" }
        ],
        keyPoints: [
          { point: "Consensus prevents double-spending.", nepaliPoint: "सहमतिले दोहोरो खर्च रोक्छ।" },
          { point: "PoW is energy-intensive, PoS is energy-efficient.", nepaliPoint: "PoW ऊर्जा-गहन छ, PoS ऊर्जा-कुशल छ।" }
        ]
      },
      { 
        id: 7, 
        title: "Nodes and Networks", 
        nepaliTitle: "नोडहरू र नेटवर्कहरू", 
        description: "Full nodes, Light nodes, and Miners/Validators.", 
        nepaliDescription: "पूर्ण नोडहरू, लाइट नोडहरू, र खानी/प्रमाणकहरू।",
        lessonContent: "Nodes are computers that run the blockchain software. Full nodes store the entire history, while light nodes only store headers.",
        nepaliLessonContent: "नोडहरू कम्प्युटरहरू हुन् जसले ब्लकचेन सफ्टवेयर चलाउँछन्। पूर्ण नोडहरूले सम्पूर्ण इतिहास भण्डारण गर्छन्, जबकि लाइट नोडहरूले हेडरहरू मात्र भण्डारण गर्छन्।",
        referenceLink: "https://ethereum.org/en/developers/docs/nodes-and-clients/",
        vocabulary: [
          { word: "Full Node", definition: "A node that stores the entire history of the blockchain.", nepaliWord: "फुल नोड", nepaliDefinition: "ब्लकचेनको सम्पूर्ण इतिहास भण्डार गर्ने नोड।" },
          { word: "Light Node", definition: "A node that stores only essential parts of the blockchain.", nepaliWord: "लाइट नोड", nepaliDefinition: "ब्लकचेनको आवश्यक भागहरू मात्र भण्डार गर्ने नोड।" }
        ],
        keyPoints: [
          { point: "Nodes maintain the decentralized state.", nepaliPoint: "नोडहरूले विकेन्द्रीकृत अवस्था कायम राख्छन्।" },
          { point: "More nodes = More security.", nepaliPoint: "धेरै नोडहरू = धेरै सुरक्षा।" }
        ]
      },
      { 
        id: 8, 
        title: "Wallets and Addresses", 
        nepaliTitle: "वालेट र ठेगानाहरू", 
        description: "Hot vs Cold wallets and how to manage keys.", 
        nepaliDescription: "हट बनाम कोल्ड वालेट र कुञ्जीहरू कसरी व्यवस्थापन गर्ने।",
        lessonContent: "Wallets store your private keys. Hot wallets are connected to the internet; cold wallets are offline for maximum security.",
        nepaliLessonContent: "वालेटहरूले तपाईंको निजी कुञ्जीहरू भण्डारण गर्छन्। हट वालेटहरू इन्टरनेटमा जोडिएका हुन्छन्; कोल्ड वालेटहरू अधिकतम सुरक्षाको लागि अफलाइन हुन्छन्।",
        referenceLink: "https://ethereum.org/en/wallets/",
        vocabulary: [
          { word: "Hot Wallet", definition: "A wallet connected to the internet (e.g., MetaMask).", nepaliWord: "हट वालेट", nepaliDefinition: "इन्टरनेटमा जोडिएको वालेट (उदाहरणका लागि, मेटामास्क)।" },
          { word: "Cold Wallet", definition: "An offline wallet for maximum security (e.g., Ledger).", nepaliWord: "कोल्ड वालेट", nepaliDefinition: "अधिकतम सुरक्षाको लागि अफलाइन वालेट (उदाहरणका लागि, लेजर)।" }
        ],
        keyPoints: [
          { point: "Wallets store keys, not coins.", nepaliPoint: "वालेटहरूले कुञ्जीहरू भण्डार गर्छन्, सिक्का होइन।" },
          { point: "Cold storage is safer for long-term holding.", nepaliPoint: "दीर्घकालीन होल्डिङको लागि कोल्ड स्टोरेज सुरक्षित छ।" }
        ]
      },
      { 
        id: 9, 
        title: "Transactions and Fees", 
        nepaliTitle: "लेनदेन र शुल्क", 
        description: "Gas fees and how transactions are processed.", 
        nepaliDescription: "ग्यास शुल्क र लेनदेन कसरी प्रशोधन गरिन्छ।",
        lessonContent: "Transactions require fees (Gas) to pay for the computational resources used by the network to process them.",
        nepaliLessonContent: "लेनदेनहरू प्रशोधन गर्न नेटवर्कद्वारा प्रयोग गरिने गणनात्मक स्रोतहरूको लागि शुल्क (ग्यास) आवश्यक पर्दछ।",
        referenceLink: "https://ethereum.org/en/developers/docs/gas/",
        vocabulary: [
          { word: "Gas Fee", definition: "A fee paid to miners/validators to process a transaction.", nepaliWord: "ग्यास शुल्क", nepaliDefinition: "लेनदेन प्रशोधन गर्न खानी/प्रमाणकहरूलाई तिरिने शुल्क।" },
          { word: "Mempool", definition: "A waiting area for unconfirmed transactions.", nepaliWord: "मेमपूल", nepaliDefinition: "अपुष्ट लेनदेनहरूको लागि पर्खने क्षेत्र।" }
        ],
        keyPoints: [
          { point: "Gas fees vary based on network demand.", nepaliPoint: "ग्यास शुल्क नेटवर्कको मागको आधारमा फरक हुन्छ।" },
          { point: "Higher gas = Faster confirmation.", nepaliPoint: "उच्च ग्यास = छिटो पुष्टि।" }
        ]
      },
      { 
        id: 10, 
        title: "Smart Contracts Intro", 
        nepaliTitle: "स्मार्ट सम्झौता परिचय", 
        description: "Self-executing contracts with the terms directly written into code.", 
        nepaliDescription: "कोडमा सिधै लेखिएका सर्तहरू सहितको स्व-कार्यान्वयन सम्झौताहरू।",
        lessonContent: "Smart contracts are programs stored on a blockchain that run when predetermined conditions are met.",
        nepaliLessonContent: "स्मार्ट सम्झौताहरू ब्लकचेनमा भण्डारण गरिएका प्रोग्रामहरू हुन् जुन पूर्व निर्धारित सर्तहरू पूरा भएपछि चल्छन्।",
        referenceLink: "https://ethereum.org/en/developers/docs/smart-contracts/",
        vocabulary: [
          { word: "Smart Contract", definition: "A self-executing contract with the terms of the agreement directly written into lines of code.", nepaliWord: "स्मार्ट सम्झौता", nepaliDefinition: "कोडको लाइनहरूमा सिधै लेखिएको सम्झौताको सर्तहरू सहितको स्व-कार्यान्वयन सम्झौता।" },
          { word: "Solidity", definition: "The most popular programming language for writing smart contracts on Ethereum.", nepaliWord: "सोलिडिटी", nepaliDefinition: "इथरियममा स्मार्ट सम्झौताहरू लेख्नका लागि सबैभन्दा लोकप्रिय प्रोग्रामिङ भाषा।" }
        ],
        keyPoints: [
          { point: "Smart contracts are immutable and transparent.", nepaliPoint: "स्मार्ट सम्झौताहरू अपरिवर्तनीय र पारदर्शी हुन्छन्।" },
          { point: "They remove the need for intermediaries.", nepaliPoint: "तिनीहरूले मध्यस्थकर्ताहरूको आवश्यकता हटाउँछन्।" }
        ]
      }
    ],
    quizzes: [
      { id: 101, question: "Who created Bitcoin?", nepaliQuestion: "बिटकोइन कसले सिर्जना गर्यो?", options: ["Vitalik Buterin", "Satoshi Nakamoto", "Elon Musk", "Mark Zuckerberg"], nepaliOptions: ["भिटालिक बुटेरिन", "सातोशी नाकामोतो", "एलोन मस्क", "मार्क जुकरबर्ग"], correctAnswer: 1 },
      { id: 102, question: "What is the main feature of Web3?", nepaliQuestion: "Web3 को मुख्य विशेषता के हो?", options: ["Centralization", "Read-only", "Decentralization", "Social Media"], nepaliOptions: ["केन्द्रीकरण", "पढ्ने मात्र", "विकेन्द्रीकरण", "सामाजिक मिडिया"], correctAnswer: 2 },
      { id: 103, question: "What is a 'Cold Wallet'?", nepaliQuestion: "'कोल्ड वालेट' के हो?", options: ["A wallet kept in a fridge", "An offline wallet", "A wallet with no money", "A fast wallet"], nepaliOptions: ["फ्रिजमा राखिएको वालेट", "एक अफलाइन वालेट", "पैसा नभएको वालेट", "एक छिटो वालेट"], correctAnswer: 1 },
      { id: 104, question: "What does PoW stand for?", nepaliQuestion: "PoW को पूरा रूप के हो?", options: ["Proof of Wealth", "Proof of Work", "Power of Web", "Point of Withdrawal"], nepaliOptions: ["प्रूफ अफ वेल्थ", "प्रूफ अफ वर्क", "पावर अफ वेब", "पोइन्ट अफ विथड्रअल"], correctAnswer: 1 },
      { id: 105, question: "What is a Smart Contract?", nepaliQuestion: "स्मार्ट सम्झौता के हो?", options: ["A legal document", "A self-executing code", "A hardware wallet", "A type of cryptocurrency"], nepaliOptions: ["कानूनी कागजात", "स्व-कार्यान्वयन कोड", "हार्डवेयर वालेट", "क्रिप्टोकरेन्सीको प्रकार"], correctAnswer: 1 }
    ],
    resources: [
      { title: "Bitcoin Whitepaper", nepaliTitle: "बिटकोइन ह्वाइटपेपर", url: "https://bitcoin.org/bitcoin.pdf", type: 'doc' as const },
      { title: "Ethereum Basics", nepaliTitle: "इथरियम आधारभूत", url: "https://ethereum.org/en/learn/", type: 'video' as const }
    ]
  },
  {
    id: 2,
    title: "Phase 2: Ethereum & Smart Contracts",
    nepaliTitle: "चरण २: इथरियम र स्मार्ट सम्झौताहरू",
    bannerImage: "https://images.unsplash.com/photo-1622790698141-94e30457ef12?auto=format&fit=crop&q=80&w=800&h=400",
    summary: "Dive deep into the Ethereum Virtual Machine (EVM), Solidity programming, and the lifecycle of a smart contract.",
    nepaliSummary: "इथरियम भर्चुअल मेसिन (EVM), सोलिडिटी प्रोग्रामिङ, र स्मार्ट सम्झौताको जीवनचक्रको बारेमा गहिरो अध्ययन गर्नुहोस्।",
    days: Array.from({length: 10}, (_, i) => ({
      id: i + 11,
      title: `Lesson ${i + 11}: ${["EVM Deep Dive", "Solidity Syntax", "Data Types", "Functions", "Modifiers", "Events", "Inheritance", "Error Handling", "Deployment", "Verification"][i]}`,
      nepaliTitle: `पाठ ${i + 11}: ${["EVM गहिरो अध्ययन", "सोलिडिटी सिन्ट्याक्स", "डाटा प्रकारहरू", "कार्यहरू", "मोडिफायरहरू", "घटनाहरू", "उत्तराधिकार", "त्रुटि ह्यान्डलिंग", "तैनाथी", "प्रमाणीकरण"][i]}`,
      description: "Exploring Ethereum ecosystem and contract logic.",
      nepaliDescription: "इथरियम इकोसिस्टम र सम्झौता तर्क अन्वेषण गर्दै।",
      lessonContent: "Detailed lesson about Ethereum virtual machine, gas optimization, and contract security basics.",
      nepaliLessonContent: "इथरियम भर्चुअल मेसिन, ग्यास अप्टिमाइजेसन, र सम्झौता सुरक्षा आधारभूत कुराहरूको बारेमा विस्तृत पाठ।",
      referenceLink: "https://ethereum.org",
      vocabulary: [
        { word: "EVM", definition: "Ethereum Virtual Machine, the runtime environment for smart contracts.", nepaliWord: "EVM", nepaliDefinition: "इथरियम भर्चुअल मेसिन, स्मार्ट सम्झौताहरूको लागि रनटाइम वातावरण।" },
        { word: "Solidity", definition: "Programming language for Ethereum.", nepaliWord: "सोलिडिटी", nepaliDefinition: "इथरियमको लागि प्रोग्रामिङ भाषा।" }
      ],
      keyPoints: [
        { point: "EVM executes smart contracts.", nepaliPoint: "EVM ले स्मार्ट सम्झौताहरू कार्यान्वयन गर्दछ।" },
        { point: "Solidity is statically typed.", nepaliPoint: "सोलिडिटी स्ट्याटिकली टाइप गरिएको छ।" }
      ]
    })),
    quizzes: [
      { id: 201, question: "What is EVM?", nepaliQuestion: "EVM के हो?", options: ["Ethereum Virtual Machine", "Electric Vehicle Mode", "Easy Value Money", "Ether Video Maker"], nepaliOptions: ["इथरियम भर्चुअल मेसिन", "इलेक्ट्रिक भेइकल मोड", "इजी भ्यालु मनी", "इथर भिडियो मेकर"], correctAnswer: 0 },
      { id: 202, question: "Which language is used for Ethereum contracts?", nepaliQuestion: "इथरियम सम्झौताका लागि कुन भाषा प्रयोग गरिन्छ?", options: ["Python", "Solidity", "Java", "C++"], nepaliOptions: ["पाइथन", "सोलिडिटी", "जाभा", "C++"], correctAnswer: 1 },
      { id: 203, question: "What is Gas?", nepaliQuestion: "ग्यास के हो?", options: ["Fuel for cars", "Transaction fee", "A type of token", "Cloud storage"], nepaliOptions: ["कारको लागि इन्धन", "लेनदेन शुल्क", "एक प्रकारको टोकन", "क्लाउड भण्डारण"], correctAnswer: 1 },
      { id: 204, question: "What is a modifier in Solidity?", nepaliQuestion: "सोलिडिटीमा मोडिफायर के हो?", options: ["A variable type", "A function behavior changer", "A compiler", "A wallet"], nepaliOptions: ["एक चर प्रकार", "एक प्रकार्य व्यवहार परिवर्तक", "एक कम्पाइलर", "एक वालेट"], correctAnswer: 1 },
      { id: 205, question: "What are events used for?", nepaliQuestion: "घटनाहरू के को लागि प्रयोग गरिन्छ?", options: ["Logging activities", "Sending money", "Deleting contracts", "Creating tokens"], nepaliOptions: ["गतिविधिहरू लग गर्न", "पैसा पठाउन", "सम्झौताहरू मेटाउन", "टोकनहरू सिर्जना गर्न"], correctAnswer: 0 }
    ],
    resources: [
      { title: "Solidity Docs", nepaliTitle: "सोलिडिटी कागजात", url: "https://docs.soliditylang.org/", type: 'doc' as const }
    ]
  },
  // Phases 3-10 generated with placeholders to fulfill the 100 days requirement
  ...Array.from({length: 8}, (_, i) => ({
    id: i + 3,
    title: `Phase ${i + 3}: ${["DeFi Foundations", "NFTs & Digital Ownership", "DAOs & Governance", "Layer 2 Scaling", "Web3 Security", "DApp Frontend Integration", "Advanced Smart Contracts", "Final Project & Launch"][i]}`,
    nepaliTitle: `चरण ${i + 3}: ${["DeFi आधारहरू", "NFTs र डिजिटल स्वामित्व", "DAOs र सुशासन", "लेयर २ स्केलिंग", "Web3 सुरक्षा", "DApp फ्रन्टएन्ड एकीकरण", "उन्नत स्मार्ट सम्झौताहरू", "अन्तिम परियोजना र सुरुवात"][i]}`,
    bannerImage: [
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=800&h=400", // DeFi
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800&h=400", // NFT
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=400", // DAO
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800&h=400", // Layer 2
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800&h=400", // Security
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400", // Frontend
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400", // Advanced
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=400"  // Launch
    ][i],
    summary: `Deep dive into advanced topics for phase ${i + 3}, covering technical implementation and architecture.`,
    nepaliSummary: `चरण ${i + 3} का लागि उन्नत विषयहरूमा गहिरो अध्ययन, प्राविधिक कार्यान्वयन र आर्किटेक्चर समेट्दै।`,
    days: Array.from({length: 10}, (_, j) => ({
      id: (i + 2) * 10 + j + 1,
      title: `Lesson ${(i + 2) * 10 + j + 1}`,
      nepaliTitle: `पाठ ${(i + 2) * 10 + j + 1}`,
      description: "Technical deep dive and practical exercises.",
      nepaliDescription: "प्राविधिक गहिरो अध्ययन र व्यावहारिक अभ्यास।",
      lessonContent: "This lesson provides a comprehensive overview of the specific technical requirements and best practices for this stage of the Web3 roadmap.",
      nepaliLessonContent: "यस पाठले Web3 रोडम्यापको यस चरणको लागि विशिष्ट प्राविधिक आवश्यकताहरू र उत्तम अभ्यासहरूको विस्तृत सिंहावलोकन प्रदान गर्दछ।",
      referenceLink: "https://ethereum.org",
      vocabulary: [
        { word: "Concept", definition: "A general idea or understanding.", nepaliWord: "अवधारणा", nepaliDefinition: "एक सामान्य विचार वा बुझाइ।" },
        { word: "Implementation", definition: "The process of putting a decision or plan into effect.", nepaliWord: "कार्यान्वयन", nepaliDefinition: "निर्णय वा योजना लागू गर्ने प्रक्रिया।" }
      ],
      keyPoints: [
        { point: "Understand the core principles.", nepaliPoint: "मुख्य सिद्धान्तहरू बुझ्नुहोस्।" },
        { point: "Apply the concepts in practice.", nepaliPoint: "अवधारणाहरू व्यवहारमा लागू गर्नुहोस्।" }
      ]
    })),
    quizzes: [
      { id: (i+3)*100 + 1, question: "What is the primary goal of this phase?", nepaliQuestion: "यस चरणको मुख्य लक्ष्य के हो?", options: ["Learning", "Sleeping", "Eating", "Playing"], nepaliOptions: ["सिक्ने", "सुत्ने", "खाने", "खेल्ने"], correctAnswer: 0 },
      { id: (i+3)*100 + 2, question: "Which concept is crucial here?", nepaliQuestion: "यहाँ कुन अवधारणा महत्त्वपूर्ण छ?", options: ["Decentralization", "Centralization", "Monopoly", "Dictatorship"], nepaliOptions: ["विकेन्द्रीकरण", "केन्द्रीकरण", "एकाधिकार", "तानाशाही"], correctAnswer: 0 },
      { id: (i+3)*100 + 3, question: "How do we apply this?", nepaliQuestion: "हामी यसलाई कसरी लागू गर्छौं?", options: ["Through code", "By magic", "With luck", "By guessing"], nepaliOptions: ["कोड मार्फत", "जादू द्वारा", "भाग्य संग", "अनुमान लगाएर"], correctAnswer: 0 },
      { id: (i+3)*100 + 4, question: "What is the best practice?", nepaliQuestion: "उत्तम अभ्यास के हो?", options: ["Security first", "Ignore errors", "Skip testing", "Copy paste"], nepaliOptions: ["सुरक्षा पहिले", "त्रुटिहरू बेवास्ता गर्नुहोस्", "परीक्षण छोड्नुहोस्", "कपी पेस्ट"], correctAnswer: 0 },
      { id: (i+3)*100 + 5, question: "Are you ready for the next level?", nepaliQuestion: "के तपाइँ अर्को स्तरको लागि तयार हुनुहुन्छ?", options: ["Yes", "No", "Maybe", "Not sure"], nepaliOptions: ["हो", "होइन", "सायद", "निश्चित छैन"], correctAnswer: 0 }
    ],
    resources: [
      { title: "Developer Portal", nepaliTitle: "विकासकर्ता पोर्टल", url: "https://ethereum.org/en/developers/", type: 'doc' as const }
    ]
  }))
];
