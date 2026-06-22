package com.example.productdemo;

import java.util.List;
import java.util.Scanner;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.example.productdemo.Product;

public class MainApp {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        while (true) {

            System.out.println("\n===== HIBERNATE CRUD MENU =====");
            System.out.println("1. Insert Product");
            System.out.println("2. View All Products");
            System.out.println("3. Update Product");
            System.out.println("4. Delete Product");
            System.out.println("5. Exit");
            System.out.print("Enter choice: ");

            int choice = sc.nextInt();

            switch (choice) {

                // ---------------- INSERT ----------------
                case 1:
                    Session session1 = HibernateUtil.getSessionFactory().openSession();
                    Transaction tx1 = session1.beginTransaction();

                    Product p = new Product();

                    System.out.print("Enter ID: ");
                    p.setId(sc.nextInt());

                    sc.nextLine(); // consume newline

                    System.out.print("Enter Name: ");
                    p.setName(sc.nextLine());

                    System.out.print("Enter Price: ");
                    p.setPrice(sc.nextDouble());

                    session1.persist(p);

                    tx1.commit();
                    session1.close();

                    System.out.println("Product Inserted!");
                    break;

                // ---------------- VIEW ALL ----------------
                case 2:
                    Session session2 = HibernateUtil.getSessionFactory().openSession();

                    List<Product> list = session2.createQuery("from Product", Product.class).list();

                    System.out.println("\n--- PRODUCT LIST ---");
                    for (Product prod : list) {
                        System.out.println(prod.getId() + " | " +
                                           prod.getName() + " | " +
                                           prod.getPrice());
                    }

                    session2.close();
                    break;

                // ---------------- UPDATE ----------------
                case 3:
                    Session session3 = HibernateUtil.getSessionFactory().openSession();
                    Transaction tx3 = session3.beginTransaction();

                    System.out.print("Enter Product ID to update: ");
                    int uid = sc.nextInt();

                    Product existing = session3.get(Product.class, uid);

                    if (existing != null) {
                        sc.nextLine();

                        System.out.print("Enter new Name: ");
                        existing.setName(sc.nextLine());

                        System.out.print("Enter new Price: ");
                        existing.setPrice(sc.nextDouble());

                        session3.merge(existing);

                        System.out.println("Product Updated!");
                    } else {
                        System.out.println("Product not found!");
                    }

                    tx3.commit();
                    session3.close();
                    break;

                // ---------------- DELETE ----------------
                case 4:
                    Session session4 = HibernateUtil.getSessionFactory().openSession();
                    Transaction tx4 = session4.beginTransaction();

                    System.out.print("Enter Product ID to delete: ");
                    int did = sc.nextInt();

                    Product del = session4.get(Product.class, did);

                    if (del != null) {
                        session4.remove(del);
                        System.out.println("Product Deleted!");
                    } else {
                        System.out.println("Product not found!");
                    }

                    tx4.commit();
                    session4.close();
                    break;

                // ---------------- EXIT ----------------
                case 5:
                    System.out.println("Exiting...");
                    sc.close();
                    System.exit(0);

                default:
                    System.out.println("Invalid choice!");
            }
        }
    }
}