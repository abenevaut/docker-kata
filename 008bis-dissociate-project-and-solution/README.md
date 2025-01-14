https://learn.microsoft.com/en-us/visualstudio/containers/tutorial-multicontainer?view=vs-2022

chatgpt:

### 1. **Move the project files to a new directory**
- **Locate the project**: Navigate to the current location of your project in your file explorer.
- **Move the project folder**: Move the folder containing the project files (e.g., `.csproj`, `.vbproj`, etc.) to the desired new location.

---

### 2. **Update the solution in Visual Studio**
- Open the solution in Visual Studio.
- If the moved project is no longer found (you'll see an error with an exclamation mark in the Solution Explorer), follow these steps:
    1. **Remove the old link**:
        - Right-click the project in Visual Studio and select **"Remove"** or **"Unload"** (this will not delete the files, only the link to the project in the solution).
    2. **Add the moved project**:
        - Right-click the solution in Solution Explorer and choose **"Add" → "Existing Project…"**.
        - Navigate to the new location of the project and select the `.csproj` or `.vbproj` file.

---

### 3. **Verify and update relative paths**
- Open the `.sln` (solution) file in a text editor if necessary.
- Check that the paths to the projects in the `.sln` file point to their new location. For example:
  ```plaintext
  Project("{GUID}") = "MyProject", "NewPath\MyProject.csproj", "{GUID2}"
  ```
- If the paths are incorrect, manually fix them or let Visual Studio update them after re-adding the project.

---

### 4. **Rebuild the solution**
- Once the project has been added from its new location, rebuild the solution to ensure everything works correctly.

---

### 5. **Update other files or references (if needed)**
- If the moved project is referenced by other projects or solutions, check and update those references as well.
- If file paths or custom configurations use absolute paths, adjust them accordingly.

---

### Bonus: If you're creating a project from scratch
When creating a new project in Visual Studio, you can ensure the solution and project are stored in separate directories right from the start:
- During the creation process, uncheck **"Place solution and project in the same directory"**.

This will ensure the solution and project are stored in separate folders.
