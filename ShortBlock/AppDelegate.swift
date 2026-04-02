//
//  AppDelegate.swift
//  ShortBlock
//
//  Created by vordenken
//

import Cocoa

@main
class AppDelegate: NSObject, NSApplicationDelegate {

    private let updateController = UpdateController()

    func applicationDidFinishLaunching(_ notification: Notification) {
        setupMenu()
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

    @objc func checkForUpdates(_ sender: Any?) {
        updateController.checkForUpdates()
    }

    private func setupMenu() {
        let mainMenu = NSMenu()

        // App Menu
        let appMenu = NSMenu()
        let appMenuItem = NSMenuItem(title: "ShortBlock", action: nil, keyEquivalent: "")
        appMenuItem.submenu = appMenu

        appMenu.addItem(NSMenuItem(title: "About ShortBlock", action: #selector(NSApplication.orderFrontStandardAboutPanel(_:)), keyEquivalent: ""))
        appMenu.addItem(NSMenuItem.separator())
        appMenu.addItem(NSMenuItem(title: "Check for updates...", action: #selector(checkForUpdates(_:)), keyEquivalent: ""))
        appMenu.addItem(NSMenuItem.separator())
        appMenu.addItem(NSMenuItem(title: "Quit ShortBlock", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q"))

        // Support Menu
        let supportMenu = NSMenu(title: "Support")
        let supportMenuItem = NSMenuItem(title: "Support", action: nil, keyEquivalent: "")
        supportMenuItem.submenu = supportMenu

        supportMenu.addItem(NSMenuItem(title: "GitHub Repository", action: #selector(openGitHub(_:)), keyEquivalent: ""))

        mainMenu.addItem(appMenuItem)
        mainMenu.addItem(supportMenuItem)

        NSApplication.shared.mainMenu = mainMenu
    }

    @objc func openGitHub(_ sender: Any?) {
        if let url = URL(string: "https://github.com/vordenken/ShortBlock") {
            NSWorkspace.shared.open(url)
        }
    }
}
