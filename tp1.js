function getUser(userId, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!userId) return callback(new Error("userId manquant"), null);
            callback(null, { id: userId, name: "Alice", email: "alice@example.com" });
        }, 300);
    })
}

function getOrders(user, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!user) return callback(new Error("Utilisateur introuvable"), null);
            callback(null, [
                { id: 1, product: "Laptop", price: 999 },
                { id: 2, product: "Souris", price: 29 },
                { id: 3, product: "Clavier", price: 79 },
            ]);
        }, 400);
    })
}

function computeTotal(orders, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!orders || orders.length === 0)
                return callback(new Error("Aucune commande"), null);
            const total = orders.reduce((acc, o) => acc + o.price, 0);
            callback(null, total);
        }, 200);
    })
}

// Utilisation — callback hell
getUser(42, (err, user) => {
    if (err) {
        console.error("Erreur :", err.message);
        return;
    }
    getOrders(user, (err, orders) => {
        if (err) {
            console.error("Erreur :", err.message);
            return;
        }
        computeTotal(orders, (err, total) => {
            if (err) {
                console.error("Erreur :", err.message);
                return;
            }
            console.log(`Total des achats de ${user.name} : ${total}€`);
        });
    });
});

async function processUser(userId) {
    try {
        const user = await getUser(userId);
        const orders = await getOrders(userId);
        const total = await computeTotal(userId);
    } catch (err) {
        console.error("Erreur :", err.message);
    }
}