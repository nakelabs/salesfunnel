// Shared products data for the application
export const products = [
    {
        id: 1,
        sku: 'BEV-SW-001',
        name: 'Sparkling Water - Lemon',
        brand: 'AquaFresh',
        description: '24 cans / case',
        category: 'Carbonated Beverages',
        distributor: {
            name: 'Metro Warehouse',
            initials: 'MW'
        },
        marketPrice: 32500,
        salesFunnelPrice: 27750,
        stock: 450,
        status: 'in-stock',
        rating: 4.8,
        orders: 120,
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EHWMvqJ1HCW1tZ4L0d3oPzGCPH_-a4RMtPsqvP1AbPG8Msz-tudXKviPHSfbh_k11V7t0JOpurfsNGkOt8uNnEuxDu71hdzaBFSW95Yj5RNoKfbuiJhgjxGhEAVzRKN5Yi3EEkZo8NK4EZPuw-q0v87O6AQXyOJzjqNppTed0aNbaMktGR8Ydvwy5AnmZ8V9eBBg5gdBf2qrNujOeECnC3ACpYGyNCanGF2xDXaQp_aBFQlp62d40ROlNWNeJS5S6T-7vRDeDWSh',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EHWMvqJ1HCW1tZ4L0d3oPzGCPH_-a4RMtPsqvP1AbPG8Msz-tudXKviPHSfbh_k11V7t0JOpurfsNGkOt8uNnEuxDu71hdzaBFSW95Yj5RNoKfbuiJhgjxGhEAVzRKN5Yi3EEkZo8NK4EZPuw-q0v87O6AQXyOJzjqNppTed0aNbaMktGR8Ydvwy5AnmZ8V9eBBg5gdBf2qrNujOeECnC3ACpYGyNCanGF2xDXaQp_aBFQlp62d40ROlNWNeJS5S6T-7vRDeDWSh'
        ],
        pricingTiers: [
            { min: 1, max: 49, price: 27750 },
            { min: 50, max: 99, price: 26500 },
            { min: 100, max: null, price: 25000 }
        ],
        specs: {
            unitVolume: '330ml',
            caseCount: '24 Cans',
            minOrder: '5 Cases',
            material: 'Aluminum Can',
            origin: 'Nigeria'
        },
        fullDescription: 'AquaFresh Sparkling Water with natural lemon flavor provides a refreshing alternative to sugary drinks. Perfect for restaurants, cafes, and retail stores. Each case contains 24 cans of 330ml each.\n\nCases are packaged for easy transport and stacking. Long shelf life ensures product freshness.'
    },
    {
        id: 2,
        sku: 'SNK-PC-042',
        name: 'Sea Salt Potato Chips',
        brand: 'CrunchMaster',
        description: '12 bags / case',
        category: 'Snacks',
        distributor: {
            name: 'FastTrack Logistics',
            initials: 'FT'
        },
        marketPrice: 41500,
        salesFunnelPrice: 36000,
        stock: 12,
        status: 'low-stock',
        rating: 4.5,
        orders: 85,
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAv4aVEH7fD44OBzrforcvWkPGJ0VHszy4CxpiCo_4f3x4RbHZZ6tjM3Js6tcWe9opSmaXYPwJiFDpQLfAjBsn6i548FFQBgKb67quRjE5T9-AjRSwYzlpqWprPSZFrKepDITE7BwuvQDv5pSld7tUomPL7qZAdvLhVeDTZylP-ffPzM86lQXdSOidm7ME5YTwL8606Qz-s435sw4fw5o3mdQChguu4e-09hcVeb3oHUmsNccEB4VgsNrQCAAX1P0LFMQGa58EzmPh2',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAv4aVEH7fD44OBzrforcvWkPGJ0VHszy4CxpiCo_4f3x4RbHZZ6tjM3Js6tcWe9opSmaXYPwJiFDpQLfAjBsn6i548FFQBgKb67quRjE5T9-AjRSwYzlpqWprPSZFrKepDITE7BwuvQDv5pSld7tUomPL7qZAdvLhVeDTZylP-ffPzM86lQXdSOidm7ME5YTwL8606Qz-s435sw4fw5o3mdQChguu4e-09hcVeb3oHUmsNccEB4VgsNrQCAAX1P0LFMQGa58EzmPh2'
        ],
        pricingTiers: [
            { min: 1, max: 49, price: 36000 },
            { min: 50, max: 99, price: 34500 },
            { min: 100, max: null, price: 33000 }
        ],
        specs: {
            unitVolume: '200g',
            caseCount: '12 Bags',
            minOrder: '3 Cases',
            material: 'Food-grade plastic',
            origin: 'Nigeria'
        },
        fullDescription: 'Premium sea salt potato chips made from locally sourced potatoes. Lightly salted for the perfect crunch. Ideal for convenience stores, cafes, and vending machines.\n\nEach case contains 12 bags of 200g each. Best consumed within 6 months of production date.'
    },
    {
        id: 3,
        sku: 'COF-WB-101',
        name: 'Arabica Whole Bean Coffee',
        brand: 'BeanCraft',
        description: '6 bags (1kg) / case',
        category: 'Coffee & Beverages',
        distributor: {
            name: 'Global Imports Ltd',
            initials: 'GI'
        },
        marketPrice: 145000,
        salesFunnelPrice: 127500,
        stock: 800,
        status: 'in-stock',
        rating: 4.9,
        orders: 250,
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBQts0Xw0aBJ9ogK2n0QuFJ4jcM63d8sXqObvXstwQGVdAPzz9nRVu8L2bX6CmcLUgRdfd98Pa-YUftTc-_7ccYeUHv92AbZxrqDLFg0KBtlBjUWBNZ2dJe5KB-kVXaumfdBKVU45SbjtOn57S4FTkPLLdDVlEkopMN0QySzpiH-fB8SwDxGQCUU9ofKx5FKNK3wbAwliV707-cVcaB__vseb0IcoSrpurbV8U7BsqqkG8Un3f73hY0g06UNck5IF7gvvmViGgD8ZF1',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBQts0Xw0aBJ9ogK2n0QuFJ4jcM63d8sXqObvXstwQGVdAPzz9nRVu8L2bX6CmcLUgRdfd98Pa-YUftTc-_7ccYeUHv92AbZxrqDLFg0KBtlBjUWBNZ2dJe5KB-kVXaumfdBKVU45SbjtOn57S4FTkPLLdDVlEkopMN0QySzpiH-fB8SwDxGQCUU9ofKx5FKNK3wbAwliV707-cVcaB__vseb0IcoSrpurbV8U7BsqqkG8Un3f73hY0g06UNck5IF7gvvmViGgD8ZF1'
        ],
        pricingTiers: [
            { min: 1, max: 49, price: 127500 },
            { min: 50, max: 99, price: 122000 },
            { min: 100, max: null, price: 115000 }
        ],
        specs: {
            unitVolume: '1kg',
            caseCount: '6 Bags',
            minOrder: '2 Cases',
            material: 'Vacuum-sealed bags',
            origin: 'Ethiopia'
        },
        fullDescription: 'Premium Arabica whole bean coffee sourced from Ethiopian highlands. Rich, smooth flavor with notes of chocolate and berries. Perfect for coffee shops, restaurants, and specialty retailers.\n\nVacuum-sealed to preserve freshness. Roasted to perfection and packaged for quality.'
    },
    {
        id: 4,
        sku: 'GRN-RC-550',
        name: 'Organic Jasmine Rice',
        brand: 'GrainPro',
        description: '10 bags (2kg) / case',
        category: 'Grains & Rice',
        distributor: {
            name: 'Prime Goods Co.',
            initials: 'PG'
        },
        marketPrice: 55000,
        salesFunnelPrice: 48000,
        stock: 0,
        status: 'out-of-stock',
        rating: 4.7,
        orders: 180,
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBvarUtMOQGoZECkWGj3bQIq_yifrEOxnhKU4tj1ampgmQtnEvrGrh4mCfqrdRjfFQoiD7AY0dn80dz9WWjDdcH4VUCHKfEuapwOFI9Pz6Iu4g9MwCZTgWyensVDIyQtHPshxjbgx7nGnPzRcHwo52wHSiJqJZ3eARhJ2asodeMqRnyhS3ifdqmL-dH2JC-Z330T4pjUi_0-Z1ZA6MdM7dcLfXeVudIDuxQVFrtFKEF9FsG9uW7slLWPcm4K8KRgSxJbwcoC5ja220m',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBvarUtMOQGoZECkWGj3bQIq_yifrEOxnhKU4tj1ampgmQtnEvrGrh4mCfqrdRjfFQoiD7AY0dn80dz9WWjDdcH4VUCHKfEuapwOFI9Pz6Iu4g9MwCZTgWyensVDIyQtHPshxjbgx7nGnPzRcHwo52wHSiJqJZ3eARhJ2asodeMqRnyhS3ifdqmL-dH2JC-Z330T4pjUi_0-Z1ZA6MdM7dcLfXeVudIDuxQVFrtFKEF9FsG9uW7slLWPcm4K8KRgSxJbwcoC5ja220m'
        ],
        pricingTiers: [
            { min: 1, max: 49, price: 48000 },
            { min: 50, max: 99, price: 46000 },
            { min: 100, max: null, price: 44000 }
        ],
        specs: {
            unitVolume: '2kg',
            caseCount: '10 Bags',
            minOrder: '5 Cases',
            material: 'Woven polypropylene',
            origin: 'Thailand'
        },
        fullDescription: 'Premium organic jasmine rice with natural fragrance. Certified organic and non-GMO. Ideal for restaurants, hotels, and grocery stores.\n\nEach case contains 10 bags of 2kg each. Store in a cool, dry place for optimal freshness.'
    },
    {
        id: 5,
        sku: 'CLN-SP-200',
        name: 'Multi-Surface Cleaning Spray',
        brand: 'CleanMax',
        description: '12 bottles / case',
        category: 'Cleaning Products',
        distributor: {
            name: 'Metro Warehouse',
            initials: 'MW'
        },
        marketPrice: 65000,
        salesFunnelPrice: 57000,
        stock: 200,
        status: 'in-stock',
        rating: 4.6,
        orders: 95,
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCAvN4KCz5AY5jy4ZxtsfKZ4tUcCN9Sr-pG82gvVG2mDNS7yzsd7NUc7VHkx8GxWsPrwMXNlUY_xH__DsgaCzKWXTd7BwvRKFvKmeKGIu8UNUphz8_9zIp5jv9HfH3yeMSvaVn1U3eCNSArTIfCkLRdam2VQk6DqTxZLHJKbfqLjjelcNvhrr4hrAwvBY6G3ZBl3UG9y0ixMRfo4FD5NUgxDuqV7mn17vlcubP8ISw2-kIQgN-VL5pEzeoMIYIeDAnnlRE0y7taOjAC',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCAvN4KCz5AY5jy4ZxtsfKZ4tUcCN9Sr-pG82gvVG2mDNS7yzsd7NUc7VHkx8GxWsPrwMXNlUY_xH__DsgaCzKWXTd7BwvRKFvKmeKGIu8UNUphz8_9zIp5jv9HfH3yeMSvaVn1U3eCNSArTIfCkLRdam2VQk6DqTxZLHJKbfqLjjelcNvhrr4hrAwvBY6G3ZBl3UG9y0ixMRfo4FD5NUgxDuqV7mn17vlcubP8ISw2-kIQgN-VL5pEzeoMIYIeDAnnlRE0y7taOjAC'
        ],
        pricingTiers: [
            { min: 1, max: 49, price: 57000 },
            { min: 50, max: 99, price: 54500 },
            { min: 100, max: null, price: 52000 }
        ],
        specs: {
            unitVolume: '750ml',
            caseCount: '12 Bottles',
            minOrder: '3 Cases',
            material: 'HDPE plastic',
            origin: 'Nigeria'
        },
        fullDescription: 'Professional-grade multi-surface cleaning spray effective on glass, countertops, and kitchen surfaces. Antibacterial formula kills 99.9% of germs.\n\nIdeal for hotels, offices, and commercial establishments. Each bottle contains 750ml of cleaning solution.'
    },
    {
        id: 6,
        sku: 'SNK-CR-222',
        name: 'Artisan Rosemary Crackers',
        brand: 'BakeMaster',
        description: '12 boxes / case',
        category: 'Snacks',
        distributor: {
            name: 'FastTrack Logistics',
            initials: 'FT'
        },
        marketPrice: 72500,
        salesFunnelPrice: 63000,
        stock: 150,
        status: 'in-stock',
        rating: 4.8,
        orders: 110,
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAAi9AMiq0wITnnFJlyPDcOV96cG1jD4XsES9WZkOt8_tmOadLFZ5C0fh8JItbowXsS3Xb4EdWAc5ANyipHZfsDl9wf3pOw65K857ZjlWCVEKgTV-qoWuEajWqSRV8DiIr5bJTJPUfNhumLZW-ngJnnPG6OEU9W4TW-EMcKPtehuYCcbvNuilpBZ0EFMu41FXy9Xzr2E6NfpbXQpvrLWZZU2eVlP3sTvKMWI3KvRyVQXdUe3hpMylE7XzzXsOpjGqnzmIpL71M6bd1p',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAAi9AMiq0wITnnFJlyPDcOV96cG1jD4XsES9WZkOt8_tmOadLFZ5C0fh8JItbowXsS3Xb4EdWAc5ANyipHZfsDl9wf3pOw65K857ZjlWCVEKgTV-qoWuEajWqSRV8DiIr5bJTJPUfNhumLZW-ngJnnPG6OEU9W4TW-EMcKPtehuYCcbvNuilpBZ0EFMu41FXy9Xzr2E6NfpbXQpvrLWZZU2eVlP3sTvKMWI3KvRyVQXdUe3hpMylE7XzzXsOpjGqnzmIpL71M6bd1p'
        ],
        pricingTiers: [
            { min: 1, max: 49, price: 63000 },
            { min: 50, max: 99, price: 60000 },
            { min: 100, max: null, price: 57500 }
        ],
        specs: {
            unitVolume: '250g',
            caseCount: '12 Boxes',
            minOrder: '4 Cases',
            material: 'Cardboard packaging',
            origin: 'Italy'
        },
        fullDescription: 'Gourmet artisan crackers infused with fresh rosemary. Perfect for cheese boards, appetizers, and upscale dining. Made with premium ingredients and traditional baking methods.\n\nEach box contains 250g of crackers. Best served with cheese, dips, or enjoyed on their own.'
    }
];

export const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
};
