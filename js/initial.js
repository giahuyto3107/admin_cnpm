

//Khoi tao danh sach san pham
function createProduct() {
    if (localStorage.getItem('products') == null) {
        let products = [{
            id: 1,
            status: 1, 
            title: 'Giày Nike Blazer Mid Pro Club ‘Phantom Neutral Olive’ ',
            img: './img/img1.png',
            category: 'Nike',
            price: 4290000,
            desc: 'Giày Nike Blazer Mid Pro Club ‘Phantom Neutral Olive’  là một lựa chọn phù hợp cho những người yêu thích phong cách cổ điển của dòng giày Blazer. Phiên bản này có thiết kế đơn giản nhưng vẫn mang lại sự tinh tế và thời trang.'
        },
        {
            id: 2,
            status: 1, 
            title: 'Giày adidas Harden Stepback 2 ‘Avatar Pack – Crew Yellow’ ',
            img: './img/img8.png',
            category: 'Adidas',
            price: 1990000,
            desc: 'Giày adidas Harden Stepback 2 ‘Avatar Pack – Crew Yellow’ là một đôi giày bóng rổ lấy cảm hứng từ bộ phim Avatar nổi tiếng. Nó có thiết kế màu vàng tươi sáng với các chi tiết màu đen tương phản, và được làm từ các vật liệu cao cấp để mang lại sự thoải mái và hiệu suất tối đa.'
        },
        {
            id: 3,
            status: 1, 
            title: 'Giày Air Jordan 1 Blazer High Zoom Comfort 2 ‘FIBA’',
            img: './img/img13.png',
            category: 'Jordan',
            price: 4890000,
            desc: 'Giày Air Jordan 1 High Zoom Comfort 2 ‘FIBA’ là một phiên bản cập nhật của Air Jordan 1 High Zoom Comfort, được phát hành lần đầu tiên vào năm 2021. Phiên bản mới này được lấy cảm hứng từ màu sắc của đội tuyển bóng rổ quốc gia Việt Nam, với các tông màu trắng, xám trung tính và vàng kim.'
        },
        {
            id: 4,
            status: 1, 
            title: 'Giày Vans Style 36 Decon Sf ‘Black White’',
            img: './img/img20.png',
            category: 'Vans',
            price: 2890000,
            desc: 'Giày Vans Style 36 Decon SF ‘Black White’ là một phiên bản của dòng giày Vans Old Skool, với thiết kế đơn giản, năng động và sự kết hợp màu sắc truyền thống giữa đen và trắng.'
        },
        {
            id: 5,
            status: 1, 
            title: 'Giày Converse Chuck Taylor All Star Low ‘Embroidered Floral – Egret’ (WMNS)',
            category: 'Converse',
            img: './img/img27.png',
            price: 2690000,
            desc: '“(WMNS) Converse Chuck Taylor All Star Low ‘Embroidered Floral – Egret’” là phiên bản giày Converse Chuck Taylor All Star Low dành riêng cho phụ nữ (Women’s – WMNS), với họa tiết hoa văn thêu tinh tế trên màu nền “Egret” (màu be sữa).'
        },
        {
            id: 6,
            status: 1, 
            title: 'Giày Nike Air Max 1 ‘Steelers’ ',
            img: './img/img2.png',
            category: 'Nike',
            price: 4890000,
            desc: 'Giày là một lựa chọn tuyệt vời cho người hâm mộ Pittsburgh Steelers. Nó có thiết kế đẹp mắt và chất lượng cao. Giày cũng thoải mái và hỗ trợ, khiến nó trở thành lựa chọn tuyệt vời cho việc đi lại hàng ngày hoặc chơi thể thao.'
        },
        {
            id: 7,
            status: 1, 
            title: 'Giày Adidas Blazer Pro Bounce 2018 Basketball Shoes ‘Black Royal Blue Orange’',
            category: 'Adidas',
            img: './img/img7.png',
            price: 1390000,
            desc: 'Giày bóng rổ Adidas Pro Bounce 2018 ‘Black Royal Blue Orange’ là một đôi giày được thiết kế cho các cầu thủ bóng rổ đang tìm kiếm sự thoải mái, hiệu suất và phong cách. Nó có thiết kế màu đen, xanh hoàng gia và cam bắt mắt, và được làm từ các vật liệu cao cấp cho độ hỗ trợ và độ bền tối đa.'
        },
        {
            id: 8,
            status: 1, 
            title: 'Giày Air Jordan Tatum 1 ‘Home Team’ ',
            img: './img/img15.png',
            category: 'Jordan',
            price: 3890000,
            desc: 'Giày Air Jordan Tatum 1 ‘Home Team’là một đôi giày bóng rổ được thiết kế cho những cầu thủ cần sự hỗ trợ và độ bền trên sân ngoài trời. Đôi giày có màu đen chủ đạo với các điểm nhấn màu xám than và xanh lá cây.'
        },
        {
            id: 9,
            status: 1, 
            title: 'Giày Vans Old Skool Mule',
            img: './img/img19.png',
            category: 'Vans',
            price: 1790000,
            desc: 'Giày Vans Old Skool Mule là một phiên bản thời trang độc đáo và đặc biệt của hãng giày Vans, nổi tiếng với phong cách skateboard và đôi giày Old Skool truyền thống. Mule được thiết kế để mang đến sự thoải mái và dễ dàng khi mặc vào và tháo ra.'
        },
        {
            id: 10,
            status: 1, 
            title: 'Giày Converse Chuck Taylor All Star Malden Street ‘Blue’',
            category: 'Converse',
            img: './img/img29.png',
            price: 1890000,
            desc: 'Những chiếc Giày Converse Chuck Taylor All Star Malden Street ‘Blue’ đầy cá tính để làm phong phú tủ đồ của mình.'
        },
        {
            id: 11,
            status: 1, 
            title: 'Giày Nike Air Max TW ‘Triple White’ ',
            img: './img/img3.png',
            category: 'Nike',
            price: 4190000,
            desc: 'Giày Nike Air Max TW ‘Triple White’ là một lựa chọn tuyệt vời cho những người tìm kiếm một đôi giày thể thao phong cách sống sạch sẽ và thoải mái. Nó có thể được mặc đi làm, đi chơi hoặc đi chơi.'
        },
        {
            id: 12,
            status: 1, 
            title: 'Giày adidas X9000l2 Low Tops ‘Ice Purple’ (W)',
            category: 'Adidas',
            img: './img/img11.png',
            price: 3590000,
            desc: 'Giày adidas X9000l2 Low Tops ‘Ice Purple’ (W)là một đôi giày chạy bộ nữ được thiết kế để mang lại sự thoải mái và linh hoạt. Đôi giày có phần thân trên bằng lưới và da tổng hợp, đế giữa bằng EVA và đế ngoài bằng cao su.'
        },
        {
            id: 13,
            status: 1, 
            title: 'Giày Air Jordan Tatum 1 GS ‘Wave Runner’',
            img: './img/img16.png',
            category: 'Jordan',
            price: 3890000,
            desc: 'Giày Air Jordan Tatum 1 GS ‘Wave Runner’  là một phiên bản dành cho trẻ em của mẫu giày bóng rổ signature của Jayson Tatum. Giày có phần upper được làm từ da lộn và da tổng hợp, với tông màu chính là Lagoon Pulse, Psychic Purple, White và Pink Blast. Phần đế giữa được làm từ cao su Zoom Air, mang lại khả năng đệm và phản hồi tuyệt vời. Phần đế ngoài được làm từ cao su cứng, mang lại độ bền và độ bám tốt.'
        },
        {
            id: 14,
            status: 1, 
            title: 'Giày Vans Bedwin & The Heartbreakers x Authentic ‘Bandana Pack – Multi B’',
            category: 'Vans',
            img: './img/img22.png',
            price: 2500000,
            desc: 'Giày Vans Bedwin & The Heartbreakers x Authentic ‘Bandana Pack – Multi B’ là một đôi giày từ thương hiệu Vans, mang đến sự kết hợp tuyệt vời giữa phong cách thể thao và thiết kế hiện đại.'
        },
        {
            id: 15,
            status: 1, 
            title: 'Giày Converse Chuck 70 High ‘Spectrum’',
            category: 'Converse',
            img: './img/img40.png',
            price: 2990000,
            desc: '“Converse Chuck 70 High ‘Spectrum’” là một phiên bản giày cao cổ của dòng sản phẩm Converse Chuck 70, với một mẫu hoa văn đa dạng và màu sắc đậm nổi bật.'
        },
        {
            id: 16,
            status: 1, 
            title: 'Giày Nike Air Max 1 ‘Chili 2.0’ ',
            img: './img/img4.png',
            category: 'Nike',
            price: 4890000,
            desc: 'Nike Air Max 1 ‘Chili 2.0’ có phần trên bằng lưới màu trắng thoáng khí, được tạo điểm nhấn bằng dấu Swoosh màu đỏ tươi và được gia cố bằng lớp phủ da lộn tổng hợp có màu xám nhạt. Màu đen tương phản tạo điểm nhấn cho tấm chắn bùn và nội thất lót vải. Lớp đệm nhẹ đến từ đế giữa bằng polyurethane màu trắng, được tạo hình theo hình nêm cổ điển và được trang bị bộ phận Max Air nhuốm màu đỏ ở gót chân.'
        },
        {
            id: 17,
            status: 1, 
            title: 'Giày Adidas X_PLRBOOST ‘Halo Blue Solar Red’',
            category: 'Adidas',
            img: './img/img10.png',
            price: 2690000,
            desc: 'Giày Adidas X_PLRBOOST ‘Halo Blue Solar Red’ là một đôi giày thể thao đa năng, được thiết kế để phù hợp với nhiều hoạt động khác nhau, từ đi lại hàng ngày đến tập luyện nhẹ nhàng. Đôi giày có thiết kế đơn giản, hiện đại, với màu sắc chủ đạo là đen và trắng.',
        },
        {
            id: 18,
            status: 1, 
            title: 'Giày Air Jordan 1 Low ‘Aqua’',
            img: './img/img17.png',
            category: 'Jordan',
            price: 3890000,
            desc: 'Air Jordan 1 Low ‘Aqua’ là một phiên bản độc đáo của Air Jordan 1 Low mang màu xanh ngọc lam tươi sáng. Nó được phát hành lần đầu tiên vào tháng 3 năm 2023 và nhanh chóng trở thành một trong những đôi giày Jordan Low phổ biến nhất.'
        },
        {
            id: 19,
            status: 1, 
            title: 'Giày Vans Rata Vulc SF ‘Duck Camo’',
            category: 'Vans',
            img: './img/img23.png',
            price: 1490000,
            desc: 'Giày Vans Rata Vulc SF ‘Duck Camo’ là một phiên bản độc đáo và thú vị trong dòng sản phẩm của Vans. Thiết kế của giày mang đến sự kết hợp giữa phong cách thể thao và họa tiết “Duck Camo” (họa tiết vẽ mô phỏng hình ảnh vịt trong môi trường tự nhiên).'
        },
        {
            id: 20,
            status: 1, 
            title: 'Giày Converse Comme des Garcons Play x Chuck Taylor All Star 1970s',
            category: 'Converse',
            img: './img/img23.png',
            price: 4890000,
            desc: 'Giày Converse Comme des Gacons Play x Chuck Taylor All Star 1970s là một sản phẩm hợp tác giữa thương hiệu giày Converse và nhãn hiệu thời trang Comme des Garcons. Được thiết kế dựa trên mẫu giày Chuck Taylor All Star 1970s mang đến cho người sử dụng cảm giác thoải mái và thanh lịch.'
        },
        {
            id: 21,
            status: 1, 
            title: 'Giày Nike Full Force Low ‘Polar’',
            img: './img/img5.png',
            category: 'Nike',
            price: 2690000,
            desc: 'Nike Full Force Low ‘Polar’ làm nổi bật phong cách gỗ cứng cổ điển lấy cảm hứng từ Air Force 3. Phần trên được chế tác từ da trắng với dấu Swoosh màu xanh nhạt tương phản và lớp phủ da màu đen viền cổ áo và lớp phủ gót chân. Phần sau được đánh dấu bằng nhãn hiệu Nike thêu, trong khi logo Force cổ điển tô điểm cho lưỡi giày. Phần đế thấp nằm trên đế giữa bằng cao su màu trắng nhạt lâu đời, có nêm xốp lộ ra để đệm nhẹ.'
        },
        {
            id: 22,
            status: 1, 
            title: 'Giày adidas Harden Stepback 3 ‘Bliss Pink’',
            category: 'Adidas',
            img: './img/img34.png',
            price: 5490000,
            desc: 'Giày bóng rổ adidas Harden Stepback 3 ‘Bliss Pink’ là một đôi giày thời trang và hiệu suất cao được thiết kế cho các cầu thủ đòi hỏi cả sự thoải mái và linh hoạt trên sân. Màu đen và trắng thanh lịch của nó toát lên vẻ ngoài tinh tế, trong khi các tính năng đổi mới của nó mang lại sự hỗ trợ và phản hồi vượt trội.'
        },
        {
            id: 23,
            status: 1, 
            title: 'Giày Air Jordan Jumpman 2021 ‘Bred’',
            img: './img/img14.png',
            category: 'Jordan',
            price: 2890000,
            desc: 'Giày Air Jordan Jumpman 2021 ‘Bred’ là một đôi giày bóng rổ chất lượng cao cung cấp sự hỗ trợ và độ bám đường tuyệt vời. Nó có thiết kế cổ điển và màu sắc mang tính biểu tượng, khiến nó trở thành một lựa chọn tuyệt vời cho những người hâm mộ Air Jordan.'
        },
        {
            id: 24,
            status: 1, 
            title: 'Giày Vans Notre x OG Style 36 LX ‘Blue’',
            category: 'Vans',
            img: './img/img21.png',
            price: 4000000,
            desc: 'Giày Vans Notre x OG Style 36 LX ‘Blue’  là một phiên bản độc đáo của dòng giày Vans, được thiết kế với sự kết hợp giữa phong cách thể thao và cá nhân hóa.'
        },
        {
            id: 25,
            status: 1, 
            title: 'Giày Converse Golf Le Fleur x Gianno Ox ‘Parfait Pink’',
            category: 'Converse',
            img: './img/img26.png',
            price: 10790000,
            desc: '“Converse Golf Le Fleur x Gianno Ox ‘Parfait Pink’” là một phiên bản giày hợp tác giữa thương hiệu Converse và Golf Le Fleur, với mẫu giày Ox (dạng thấp) và màu sắc chủ đạo là “Parfait Pink” (Hồng nhạt).'
        },
        {
            id: 26,
            status: 1, 
            title:'Giày Nike Mercurial Vapor 15 Academy ‘Hyper Turquoise’',
            img: './img/img6.png',
            category: 'Nike',
            price: 3090000,
            desc: 'Phần trên của giày được làm bằng da tổng hợp mềm mại, mang lại cảm giác thoải mái và hỗ trợ. Lớp đệm midsole bằng bọt Nike Zoom Air cung cấp khả năng đệm nhẹ nhàng và phản hồi, trong khi phần đế ngoài bằng cao su có độ bám tốt giúp bạn giữ thăng bằng và kiểm soát bóng trên sân cỏ nhân tạo.'
        },
        {
            id: 27,
            status: 1, 
            title: 'Giày adidas D Rose 11 ‘Day of the Dead’ ',
            category: 'Adidas',
            img: './img/img33.png',
            price: 2590000,
            desc: 'Giày adidas D Rose 11 ‘Day of the Dead’ là một đôi giày bóng rổ phiên bản giới hạn được thiết kế để tôn vinh phong cách chơi điện ảnh của Derrick Rose và quê hương Chicago của anh ấy. Nó có phối màu đen, cam và xanh lam rực rỡ lấy cảm hứng từ lễ hội Día de los Muertos (Ngày của người chết) mang tính biểu tượng, và tích hợp nhiều tính năng sáng tạo để nâng cao hiệu suất và sự thoải mái.'
        },
        {
            id: 28,
            status: 1, 
            title: 'Giày Air Jordan XXXVIII ‘Celebration’ PF',
            category: 'Jordan',
            img: './img/img36.png',
            price: 6890000,
            desc: 'Giày Air Jordan XXXVIII ‘Celebration’ PF là một đôi giày bóng rổ cao cổ được thiết kế để kỷ niệm 38 năm thương hiệu Air Jordan. Đôi giày có màu trắng chủ đạo với các chi tiết màu đen và vàng.'
        },
        {
            id: 29,
            status: 1, 
            title: 'Giày nam Vans Blazer Sk8-Hi ‘Black White’',
            img: './img/img24.png',
            category: 'Vans',
            price: 3290000,
            desc: 'Giày nam Vans Blazer Sk8-Hi ‘Black White’ là một phiên bản của dòng giày Vans Old Skool, với thiết kế đơn giản, năng động và dễ dàng kết hợp với nhiều trang phục khác nhau.'
        },
        {
            id: 30,
            status: 1, 
            title: 'Giày Converse Blazer Chuck Taylor All-Star 70 Hi ‘Steel Gray’ ',
            img: './img/img25.png',
            category: 'Converse',
            price: 5290000,
            desc: 'Giày Converse Chuck Taylor All-Star 70 Hi ‘Steel Gray’ là một đôi giày thể thao sneaker cao cổ, được thiết kế bởi thương hiệu Converse. Đôi giày được ra mắt vào năm 2013 và nhanh chóng trở thành một trong những đôi giày thể thao phổ biến nhất của Converse'
        },
        {
            id: 31,
            status: 1, 
            title: 'Giày AMBUSH x Nike Air More Uptempo Low ‘Lilac’',
            category: 'Nike',
            img: './img/img31.png',
            price: 7290000,
            desc: 'AMBUSH x Nike Air More Uptempo Low ‘Lilac’tái hiện hình dáng bóng rổ cổ điển như một chiếc giày đế thấp lấy cảm hứng từ giày trượt băng. Nhà thiết kế Yoon Ahn mặc phần trên bằng màu nubuck màu hoa oải hương, tương phản với nhãn hiệu ‘AIR’ ngoại cỡ bằng da màu xanh lá cây được khâu. Một biểu tượng Swoosh màu đỏ tươi được thêu trang trí ở phần mũi giày, phù hợp với biểu tượng Swoosh nạm ngọc gắn ở gót chân sau. Nhãn hiệu AMBUSH xuất hiện trên lưỡi gà, lót giày và dọc theo mặt sau của đế giữa Phylon, có màu tím nhạt với lớp đệm đế khí có thể nhìn thấy được.'
        },
        {
            id: 32,
            status: 1, 
            title: 'Giày adidas D Rose Son of Chi ‘Rare Gems’',
            category: 'Adidas',
            img: './img/img9.png',
            price: 1890000,
            desc: 'Giày adidas D Rose Son of Chi ‘Rare Gems’ là một đôi giày bóng rổ tuyệt vời cho các cầu thủ đang tìm kiếm sự thoải mái, hiệu suất và phong cách. Nó là một lựa chọn tuyệt vời cho cả chơi trong nhà và ngoài trời.',
        },
        {
            id: 33,
            status: 1, 
            title: 'Giày Air Jordan XXXVIII ‘Celebration’ ',
            img: './img/img18.png',
            category: 'Jordan',
            price: 6890000,
            desc: 'Giày Air Jordan XXXVIII ‘Celebration’  là một đôi giày bóng rổ cao cổ được thiết kế để kỷ niệm 38 năm thương hiệu Air Jordan. Đôi giày có màu trắng chủ đạo với các chi tiết màu đen và vàng.'
        },
        {
            id: 34,
            status: 1, 
            title: 'Giày Vans OG Old Skool LX x Bedwin & The Heartbreakers ‘Bandana Pack’',
            category: 'Vans',
            img: './img/img37.png',
            price: 3000000,
            desc: 'Giày Vans OG Old Skool LX x Bedwin & The Heartbreakers ‘Bandana Pack’ là một phiên bản của dòng giày Vans Old Skool, với thiết kế đơn giản, năng động và sự kết hợp màu sắc giữa đen và trắng, tạo nên một phong cách cổ điển và hiện đại'
        },
        {
            id: 35,
            status: 1, 
            title: 'Giày Converse Run Star Motion Low ‘Black’ ',
            category: 'Converse',
            img: './img/img30.png',
            price: 2590000,
            desc: '“Giày Converse Run Star Motion Low ‘Black’” là một phiên bản giày cao cổ trong dòng sản phẩm Converse Run Star Hike, với màu trắng đen tinh khôi.'
        },
        {
            id: 36,
            status: 1, 
            title: 'Giày Grant Taylor x Nike Zoom Blazer Mid Pro GT SB ‘University Gold Denim’',
            category: 'Nike',
            img: './img/img32.png',
            price: 4090000,
            desc: 'Grant Taylor x Nike Zoom Blazer Mid Pro GT SB ‘University Gold Denim’ mang những chi tiết lấy cảm hứng từ xe đua vào hình dáng cổ điển. Được làm bằng da lộn màu hổ phách, các chi tiết phía trên được làm bằng vải denim màu chàm trên tab Swoosh và mặt sau đặc trưng, ​​mặt sau có chữ ký của Grant Taylor. ‘98’ được in nổi ở gót bên, trong khi lót giày dường như được bao phủ bởi đề can xe đua. Phần giữa được hoàn thiện bằng đế giữa bằng cao su lưu hóa màu trắng, được hỗ trợ bởi đế ngoài có lực kéo xương cá.'
        },
        {
            id: 37,
            status: 1, 
            title: 'Giày Adidas Duramo SL 2.0 ‘Wonder Quartz Fuchsia’ ',
            img: './img/img12.png',
            category: 'Adidas',
            price: 1490000,
            desc: 'Adidas Duramo Sl 2.0 mang lại sự thoải mái đặc biệt với lớp đệm đế trong êm ái và lớp giữa chống sốc hỗ trợ, mang lại cảm giác phản ứng cho phép bạn thể hiện tốt nhất của mình. Đế ngoài đáng tin cậy mang lại độ bám vượt trội trên mọi bề mặt, giúp bạn tự tin thực hiện những động tác quyết định và chinh phục mọi trận đấu.'
        },
        {
            id: 38,
            status: 1, 
            title: 'Giày Air Jordan 2 Retro GS ‘Origins’',
            category: 'Jordan',
            img: './img/img35.png',
            price: 5190000,
            desc: 'Được thiết kế dành cho những đứa trẻ lớn, Air Jordan 2 Retro GS ‘Origins’ được khoác lên mình một tông màu gợi nhớ đến nguồn gốc lục địa của hình bóng. (Mẫu ra mắt ban đầu năm 1986 kết hợp các vật liệu cao cấp với tay nghề thủ công sản xuất tại Ý.) Được làm bằng da trắng mịn, phần trên vẫn giữ lớp phủ có họa tiết thằn lằn của OG AJ2. Phần giữa bàn chân được bao quanh bởi các đường ống màu đỏ và xanh lá cây, với các màu sắc tương phản tạo nên sự xuất hiện lặp lại ở gót giày và lớp lót bên trong. '
        },
        {
            id: 39,
            status: 1, 
            title: 'Giày Vans Comfort Old Skool Mule Black',
            category: 'Vans',
            img: './img/img38.png',
            price: 2590000,
            desc: 'Giày Vans Comfort Old Skool Mule Black là một mẫu giày từ thương hiệu Vans. Đôi giày này có màu sắc chủ đạo là Black (đen) và có kiểu dáng mule (giày lười).' 
        },
        {
            id: 40,
            status: 1, 
            title: 'Giày Converse x Rick Owens DRKSHDW Weapon ‘Beige Black’ ',
            category: 'Converse',
            img: './img/img39.png',
            price: 6690000,
            desc: 'Converse x Rick Owens DRKSHDW Weapon ‘Beige Black’là một phiên bản hợp tác độc đáo giữa thương hiệu giày dép Converse danh tiếng và nhà thiết kế thời trang Rick Owens. Phiên bản này mang đến sự kết hợp độc đáo giữa phong cách cổ điển của Converse với nét thiết kế táo bạo và phá cách của Rick Owens.'
        },
        {
            id: 41,
            status: 1, 
            title: 'Giày Women’s Air Jordan 1 Blazer Elevate High SE White ',
            category: 'Jordan',
            img: './img/img41.png',
            price: 5590000,
            desc: 'Giày Women’s Air Jordan 1 Elevate High SE White là một phiên bản nâng cấp của Air Jordan 1 cổ cao truyền thống. Đôi giày này có phần đế platform cao hơn, mang lại vẻ ngoài thời trang và ổn định hơn.'
        },
        {
            id: 42,
            status: 1, 
            title: 'Giày Air Jordan 1 Blazer Retro High OG ‘Satin Bred’ ',
            category: 'Jordan',
            img: './img/img42.png',
            price: 5890000,
            desc: 'Giày Air Jordan 1 Retro High OG ‘Satin Bred’ là một phiên bản đặc biệt của dòng sản phẩm Air Jordan 1. Phiên bản này được thiết kế với chất liệu satin sang trọng, kết hợp với màu đỏ và đen chủ đạo.'
        },





       
        ]
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// Create admin account 
function createAdminAccount() {
    let accounts = localStorage.getItem("accounts");
    if (!accounts) {
      accounts = [
        {
          fullname: "NTS",
          phone: "0123456789",
          password: "123456",
          address: "",
          email: "",
          status: 1,
          join: new Date(),
          cart: [],
          userType: 1,
        },
        {
          fullname: "Admin",
          phone: "9876543210",
          password: "1234567",
          address: "",
          email: "",
          status: 1,
          join: new Date(),
          cart: [],
          userType: 1,
        },
      ];
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  }
window.onload = createProduct();
window.onload = createAdminAccount();


