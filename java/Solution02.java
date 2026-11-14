import java.util.*;

public class Solution02 {

    static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    static Node top = null;

    // PUSH
    static void push(int data) {

        Node newNode = new Node(data);

        newNode.next = top;

        top = newNode;
    }

    // POP
    static int pop() {

        if (top == null) {
            System.out.println("Stack Underflow");
            return -1;
        }

        int removed = top.data;

        top = top.next;

        return removed;
    }

    // PEEK
    static int peek() {

        if (top == null) {
            System.out.println("Stack is Empty");
            return -1;
        }

        return top.data;
    }

    // DISPLAY
    static void display() {

        if (top == null) {
            System.out.println("Stack is Empty");
            return;
        }

        Node temp = top;

        while (temp != null) {
            System.out.print(temp.data + " → ");
            temp = temp.next;
        }

        System.out.println("null");
    }

    public static void main(String[] args) {

        push(10);
        push(20);
        push(30);
        push(40);

        System.out.println("Stack:");
        display();

        System.out.println("Top: " + peek());

        System.out.println("Removed: " + pop());

        System.out.println("Updated Stack:");
        display();
    }
}